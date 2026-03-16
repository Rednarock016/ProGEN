import os
import types
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

pg = types.ModuleType("pg")
with open(os.path.join(BASE_DIR, "Password Generater"), "r") as f:
    code = f.read()
exec(compile(code, "Password Generater", "exec"), pg.__dict__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        mode = data.get('mode', 'easy')
        uppercase = int(data.get('uppercase', 2))
        lowercase = int(data.get('lowercase', 4))
        numbers   = int(data.get('numbers', 2))
        symbols   = int(data.get('symbols', 2))
        if mode == 'easy':
            password = pg.easymode(uppercase, lowercase, symbols, numbers)
        else:
            password = pg.hardmode(uppercase, lowercase, symbols, numbers)
        return jsonify({'success': True, 'password': password})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/save', methods=['POST'])
def save():
    try:
        data = request.get_json()
        pg.save_to_excel(data['statement'], data['password'])
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)