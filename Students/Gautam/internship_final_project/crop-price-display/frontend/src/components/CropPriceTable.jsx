import { useState } from "react";
import API from "../services/api";
import "./CropPriceTable.css";

function CropPriceTable() {

    const [crop, setCrop] = useState("");

    const [crops, setCrops] = useState([]);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);



    const searchCrop = async () => {

        if (crop.trim() === "") {

            alert("Please enter crop name");

            return;

        }

        setLoading(true);

        setMessage("");

        setCrops([]);

        try {

            const response = await API.get(

                `/crop/search/${crop}`

            );

            if (response.data.length > 0) {

                setCrops(response.data);

            }

            else {

                setMessage("No crop found.");

            }

        }

        catch (error) {

            console.log(error);

            setMessage("Unable to fetch crop data.");

        }

        finally {

            setLoading(false);

        }

    };



    return (

        <section
            id="crop-price"
            className="crop-price-section"
        >

            <h2>

                Current Crop Prices

            </h2>

            <p>

                Enter a crop name to view prices from different states and markets.

            </p>



            <div className="filter-box">

                <input

                    type="text"

                    placeholder="Enter Crop Name (e.g. Wheat)"

                    value={crop}

                    onChange={(e) => setCrop(e.target.value)}

                />



                <button

                    onClick={searchCrop}

                >

                    Search

                </button>

            </div>



            {

                loading &&

                <h3>

                    Loading...

                </h3>

            }



            {

                message &&

                <h3>

                    {message}

                </h3>

            }



            {

                crops.length > 0 &&

                <table className="crop-table">

                    <thead>

                        <tr>

                            <th>

                                Crop Name

                            </th>

                            <th>

                                State

                            </th>

                            <th>

                                Market

                            </th>

                            <th>

                                Price

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            crops.map((crop) => (

                                <tr key={crop.id}>

                                    <td>

                                        {crop.crop_name}

                                    </td>

                                    <td>

                                        {crop.state}

                                    </td>

                                    <td>

                                        {crop.market}

                                    </td>

                                    <td>

                                        ₹ {crop.price}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            }

        </section>

    );

}

export default CropPriceTable;