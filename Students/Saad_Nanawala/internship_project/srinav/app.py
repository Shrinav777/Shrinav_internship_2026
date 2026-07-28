import mysql.connector
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# MySQL Database Connection Configuration
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        port=3307,             
        user="root",
        password="saad",       
        database="cricket_db"
    )

# --- PAGE ROUTING (Serving Standalone HTML Files) ---

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/roster')
def roster():
    return render_template('roster.html')

@app.route('/stats')
def stats():
    return render_template('stats.html')

@app.route('/about')
def about():
    return render_template('about.html')

# --- REST API ENDPOINTS (CRUD Operations) ---

# READ: Fetch all players
@app.route('/api/players', methods=['GET'])
def get_players():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM players ORDER BY id DESC")
        players = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(players), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# CREATE: Add a new player
@app.route('/api/players', methods=['POST'])
def add_player():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        
        sql = "INSERT INTO players (name, role, matches, runs, wickets) VALUES (%s, %s, %s, %s, %s)"
        val = (
            data.get("name"), 
            data.get("role"), 
            data.get("matches", 0), 
            data.get("runs", 0), 
            data.get("wickets", 0)
        )
        cursor.execute(sql, val)
        conn.commit()
        
        new_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return jsonify({"message": "Player created successfully", "id": new_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# UPDATE: Modify an existing player
@app.route('/api/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    try:
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()
        
        sql = "UPDATE players SET name = %s, role = %s, matches = %s, runs = %s, wickets = %s WHERE id = %s"
        val = (
            data.get("name"), 
            data.get("role"), 
            data.get("matches"), 
            data.get("runs"), 
            data.get("wickets"), 
            player_id
        )
        cursor.execute(sql, val)
        conn.commit()
        
        cursor.close()
        conn.close()
        return jsonify({"message": "Player updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# DELETE: Remove a player
@app.route('/api/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM players WHERE id = %s", (player_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Player deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)