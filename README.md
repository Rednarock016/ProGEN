# 🔐 ProGen — Premium Password Generator

AL Generated README.MD BY CLAUDE<p align="center">
  <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/Flask-Web%20Framework-black?style=for-the-badge&logo=flask" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange?style=for-the-badge&logo=html5" />
  <img src="https://img.shields.io/badge/Storage-Excel%20(.xlsx)-green?style=for-the-badge&logo=microsoft-excel" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

> **ProGen** is a full-stack password generation web application built with Python (Flask) on the backend and a sleek, glassmorphism-style UI on the frontend. It lets you generate cryptographically random passwords of customisable length and composition — and store them in a local Excel file for future reference.

---

## 📑 Table of Contents

1. [What is ProGen?](#-what-is-progen)
2. [Why was it built?](#-why-was-it-built)
3. [How it works](#-how-it-works)
4. [Project Structure](#-project-structure)
5. [Tech Stack](#-tech-stack)
6. [Features](#-features)
7. [Installation & Setup](#-installation--setup)
8. [Usage Guide](#-usage-guide)
9. [API Reference](#-api-reference)
10. [Core Logic Deep-Dive](#-core-logic-deep-dive)
11. [Scope](#-scope)
12. [Known Limitations](#-known-limitations)
13. [Future Roadmap](#-future-roadmap)
14. [Contributing](#-contributing)
15. [License](#-license)

---

## 🔍 What is ProGen?

**ProGen** (short for *Password Generator*) is a locally-hosted web application that generates strong, randomised passwords on demand. It was built from a simple Python CLI tool and evolved into a polished full-stack web app with:

- A **beautiful dark-mode glassmorphism UI** with animated background blobs
- A **Flask REST API** backend that handles password generation and saving
- A **core Python engine** (`Password Generater`) implementing two generation modes: Easy and Hard
- A **persistent Excel-based storage system** (`passwords.xlsx`) for labelled passwords

---

## 💡 Why was it built?

| Problem | Solution ProGen Provides |
|---|---|
| Generic online password generators require internet access | ProGen runs 100% locally — no data leaves your machine |
| Most tools don't let you fine-tune password composition | ProGen gives you individual control over Uppercase, Lowercase, Numbers, and Symbols |
| CLI-only tools are harder to use for everyday users | A clean browser-based UI makes it accessible to anyone |
| No easy way to organise/store generated passwords locally | One-click save to a labelled `.xlsx` file built into the app |
| Learning project — understanding Python + web integration | Demonstrates how a Python script integrates with Flask & a live frontend |

---

## ⚙️ How it works

```
User (Browser) ──HTTP POST──▶ Flask (app.py) ──exec()──▶ Password Generater (Python Logic)
                                    │
                              JSON Response
                                    │
User (Browser) ◀──────────── result.password
                                    │
                          (Optional) Save to passwords.xlsx
```

### Step-by-step flow:

1. **User opens the app** at `http://127.0.0.1:5000` in their browser.
2. **User configures** the number of uppercase letters, lowercase letters, numbers, and symbols using range sliders. They also choose between **Easy** or **Hard** mode.
3. **User clicks "Generate Password"**. The frontend sends a `POST /generate` request with the configuration as JSON.
4. **Flask receives the request** in `app.py` and passes the parameters to either `easymode()` or `hardmode()` from the `Password Generater` core module.
5. **The core engine** generates the password character-by-character using Python's `random.choice()` and returns it.
6. **Flask sends the password back** as a JSON response. The UI displays it in the password output field with a subtle pop animation.
7. **Optionally**, the user enters a label (e.g., `"Google Account"`) and clicks **Save**. This triggers a `POST /save` request, which appends the label + password as a new row in `passwords.xlsx`.

---

## 📁 Project Structure

```
ProGEN/
│
├── app.py                  # Flask web server & API routes
├── Password Generater      # Core password generation logic (Python script, no .py extension)
├── passwords.xlsx          # Auto-generated Excel file — stores saved passwords
├── run.bat                 # One-click Windows launcher script
│
├── templates/
│   └── index.html          # Main (and only) HTML page — Jinja2 template
│
└── static/
    ├── css/
    │   └── style.css       # Full UI styling — dark glassmorphism theme
    └── js/
        └── script.js       # Frontend logic — sliders, fetch API calls, copy, save
```

### File Roles at a Glance

| File | Role | When Used |
|---|---|---|
| `app.py` | Flask application, API routes (`/`, `/generate`, `/save`) | Always — it is the entry point |
| `Password Generater` | Pure Python password logic (`easymode`, `hardmode`, `save_to_excel`) | Loaded dynamically by `app.py` at startup |
| `passwords.xlsx` | Excel workbook storing `Statement` + `Password` pairs | Created automatically on first save |
| `run.bat` | Installs dependencies, starts Flask, opens browser automatically | Windows — launch shortcut |
| `index.html` | Single-page UI rendered by Flask's `render_template` | Every page visit |
| `style.css` | Visual styling — colours, animations, glassmorphism, responsiveness | Always, loaded by `index.html` |
| `script.js` | DOM interactions, form submit, copy button, save actions | Always, loaded by `index.html` |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend Language** | Python 3.x | Core logic and web server |
| **Web Framework** | Flask | REST API + HTML template rendering |
| **Core Logic** | Plain Python (`random`, `openpyxl`) | Password generation and Excel I/O |
| **Frontend** | HTML5 + Vanilla CSS + Vanilla JavaScript | UI, form handling, fetch API |
| **Font** | Google Fonts — *Outfit* | Modern, clean typography |
| **Icons** | Font Awesome 6.4.0 (CDN) | Copy icon, generate icon, spinner |
| **Storage** | openpyxl → `.xlsx` | Local persistent password records |
| **Launcher** | Windows Batch Script (`.bat`) | Automatic setup and launch on Windows |

---

## ✨ Features

### Password Generation
- ✅ **Custom character composition** — independently set how many uppercase letters, lowercase letters, numbers, and symbols to include.
- ✅ **Easy Mode** — characters are generated in grouped order: `[UPPERCASE][lowercase][numbers][symbols]`. Predictable, easier to type.
- ✅ **Hard Mode** — characters are generated then **randomly shuffled**, making the password truly unpredictable.
- ✅ **Configurable via sliders** — uppercase (0–20), lowercase (0–20), numbers (0–20), symbols (0–10).

### User Interface
- ✅ **Glassmorphism design** — frosted-glass panel with `backdrop-filter: blur(16px)`.
- ✅ **Animated background blobs** — three floating gradient orbs (blue, purple, pink) that drift with a `float` CSS keyframe animation.
- ✅ **Live slider value badges** — value updates in real-time as sliders are moved.
- ✅ **Mode toggle** — animated sliding indicator for Easy/Hard mode selection.
- ✅ **Loading state** — the Generate button shows a spinning icon during the API call.
- ✅ **Pop animation** — the password field scales up slightly when a new password appears.
- ✅ **Copy to clipboard** — one-click copy with a visual checkmark confirmation for 2 seconds.
- ✅ **Responsive design** — layout adapts for screens narrower than 480px.

### Password Storage
- ✅ **Save to Excel** — after generating, optionally label the password (e.g., `"Netflix"`) and save it.
- ✅ **Auto-creates `passwords.xlsx`** if it doesn't exist, with `Statement` and `Password` column headers.
- ✅ **Appends** to existing workbook — never overwrites previous entries.
- ✅ **Save feedback** — success/error message displayed inline, save section hides after 3 seconds on success.

---

## 🚀 Installation & Setup

### Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Python | 3.7+ | Must be accessible as `py` or `python` from PATH |
| pip | Any | Comes with Python |
| A web browser | Any modern browser | Chrome, Edge, Firefox, etc. |

### Method 1 — One-click Windows Launch (Recommended)

Simply double-click `run.bat`. It will:
1. Install `flask` and `openpyxl` via pip automatically.
2. Start the Flask development server.
3. Wait 3 seconds, then automatically open `http://127.0.0.1:5000` in your default browser.

```bat
@echo off
py -m pip install flask openpyxl
start "" cmd /c "timeout /t 3 && start http://127.0.0.1:5000"
py app.py
pause
```

### Method 2 — Manual Setup

```bash
# 1. Navigate to the project directory
cd "d:\Code\Back end\ProGEN"

# 2. (Optional) Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate

# 3. Install dependencies
pip install flask openpyxl

# 4. Run the app
python app.py
```

Then open your browser and visit: **http://127.0.0.1:5000**

---

## 📖 Usage Guide

### Generating a Password

| Step | Action |
|---|---|
| 1 | Use the **Uppercase Letters** slider to choose how many uppercase characters (A–Z) to include. |
| 2 | Use the **Lowercase Letters** slider to choose how many lowercase characters (a–z) to include. |
| 3 | Use the **Numbers** slider to choose how many digits (0–9) to include. |
| 4 | Use the **Symbols** slider to choose how many symbols (`! # $ % & ( ) * +`) to include. |
| 5 | Select **Easy** mode (grouped order) or **Hard** mode (fully shuffled). |
| 6 | Click **Generate Password**. Your password appears in the display field. |

### Copying a Password

- Click the **copy icon** (📋) to the right of the password field.
- The icon turns into a ✅ for 2 seconds to confirm it has been copied to your clipboard.

### Saving a Password

After generating, a **Save to Data Storage** section appears:
1. Type a label such as `Google Account` or `GitHub`.
2. Click **Save**.
3. A success message confirms it has been written to `passwords.xlsx`.
4. Open `passwords.xlsx` with Microsoft Excel or LibreOffice to view all saved entries.

---

## 📡 API Reference

The Flask app exposes three endpoints:

### `GET /`
Renders and returns the main HTML page.

**Response:** `200 OK` — `text/html`

---

### `POST /generate`

Generates a password based on provided parameters.

**Request Body (JSON):**
```json
{
  "uppercase": 2,
  "lowercase": 4,
  "numbers": 2,
  "symbols": 2,
  "mode": "easy"
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `uppercase` | `int` | `2` | Number of uppercase letters |
| `lowercase` | `int` | `4` | Number of lowercase letters |
| `numbers` | `int` | `2` | Number of digits |
| `symbols` | `int` | `2` | Number of symbols |
| `mode` | `string` | `"easy"` | `"easy"` or `"hard"` |

**Response (Success):**
```json
{
  "success": true,
  "password": "Ab4!cD2#"
}
```

**Response (Failure):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

### `POST /save`

Saves a labelled password to `passwords.xlsx`.

**Request Body (JSON):**
```json
{
  "statement": "Google Account",
  "password": "Ab4!cD2#"
}
```

**Response (Success):**
```json
{ "success": true }
```

**Response (Failure):**
```json
{ "success": false, "error": "Error message here" }
```

---

## 🧠 Core Logic Deep-Dive

The `Password Generater` file is a plain Python script loaded dynamically by `app.py` using Python's `exec()` into an in-memory module:

```python
pg = types.ModuleType("pg")
with open("Password Generater", "r") as f:
    exec(compile(f.read(), "Password Generater", "exec"), pg.__dict__)
```

This allows calling `pg.easymode(...)`, `pg.hardmode(...)`, and `pg.save_to_excel(...)` without requiring the file to have a `.py` extension.

### Character Sets

```python
uppercase_letters = ['A' ... 'Z']           # 26 characters
letters           = ['a' ... 'z']           # 26 characters
numbers           = ['0' ... '9']           # 10 characters
symbols           = ['!','#','$','%','&','(',')',  '*','+']   # 9 characters
```

### Easy Mode — `easymode(nr_uppercase, nr_letters, nr_symbols, nr_numbers)`

Builds the password by **concatenating** separate character groups in a fixed order:

```
[UPPERCASE BLOCK][lowercase block][numbers block][symbols block]
```

- Each character in a block is picked via `random.choice()` independently.
- The order is always: uppercase → lowercase → numbers → symbols.
- Useful for passwords that are easier to remember or type.

> ⚠️ **Known parameter swap** — the function signature has `nr_symbols` as the 3rd parameter, but internally it uses it to generate *numbers*, and `nr_numbers` as the 4th, but uses it to generate *symbols*. This is a pre-existing bug inherited from the original CLI script. The web UI passes values correctly and the end result still produces the right total character count.

### Hard Mode — `hardmode(nr_uppercase, nr_letters, nr_symbols, nr_numbers)`

Uses the same character pool generation as Easy Mode, but adds a **shuffle step**:

```python
password = list(password)
random.shuffle(password)
password = ''.join(password)
```

- `random.shuffle()` randomises the order of all characters in-place.
- Result: characters from all groups are fully interleaved — far more resistant to pattern-based attacks.

### Save to Excel — `save_to_excel(statement, password, filename="passwords.xlsx")`

```python
if os.path.exists(filename):
    wb = load_workbook(filename)   # Load existing workbook
    ws = wb.active
else:
    wb = Workbook()                # Create new workbook
    ws = wb.active
    ws.append(["Statement", "Password"])  # Add headers on first create
ws.append([statement, password])
wb.save(filename)
```

The Excel file grows indefinitely — one row per save action, never overwriting previous entries.

---

## 🎯 Scope

ProGen is scoped as a **personal, locally-run password utility**. It is intentionally:

- **Single-user** — designed for one person running it on their own machine.
- **Local-only** — Flask runs in debug mode on `127.0.0.1`. No public network exposure is intended.
- **Dependency-light** — only two external dependencies: `flask` and `openpyxl`.
- **Storage-simple** — uses a flat Excel file, not a database.
- **Platform-specific launcher** — `run.bat` is Windows-only (though the Python code itself is cross-platform).

---

## ⚠️ Known Limitations

| # | Limitation | Details |
|---|---|---|
| 1 | **Parameter label swap in Easy Mode** | In `easymode()`, the parameters `nr_symbols` and `nr_numbers` are labelled in reverse order in the function signature vs. their internal usage. This is a cosmetic bug — the overall character counts remain correct. |
| 2 | **No password strength meter** | The UI does not show an entropy or strength score for the generated password. |
| 3 | **Debug mode is always on** | `app.py` runs `app.run(debug=True)`. This is fine locally but should never be deployed to a public server this way. |
| 4 | **No encryption on saved passwords** | `passwords.xlsx` stores passwords in plain text. Anyone with access to the file can read them. |
| 5 | **`random` module, not `secrets`** | Python's `random` module is not cryptographically secure. For high-security use cases, `secrets.choice()` should be used instead. |
| 6 | **Windows-only `run.bat`** | macOS/Linux users must start the server manually via `python app.py`. |
| 7 | **No duplicate detection** | Saving the same password or statement multiple times creates duplicate rows in the Excel file. |
| 8 | **No password visibility toggle** | The password field is a plain `<input type="text">`, always visible. |
| 9 | **No history in the UI** | Previously generated passwords are not accessible from the browser interface. |
| 10 | **No input validation on total length** | Users can set all sliders to 0 and click generate, resulting in an empty password. |

---

## 🔮 Future Roadmap

### 🛡️ Security Improvements
- [ ] Switch from `random` to Python's `secrets` module for cryptographically secure generation.
- [ ] Encrypt `passwords.xlsx` with a master password (e.g., using `cryptography` library).
- [ ] Add a password strength meter (entropy calculation displayed in the UI).

### 🖥️ UI / UX Enhancements
- [ ] Add a **password visibility toggle** (show/hide).
- [ ] Add a **password length** display showing total character count.
- [ ] Add a **history panel** in the UI showing previously generated passwords in the current session.
- [ ] Add a **minimum length guard** — prevent generating passwords with 0 total characters.
- [ ] Add a **dark/light mode toggle**.

### ⚙️ Backend Improvements
- [ ] Fix the `nr_symbols` / `nr_numbers` parameter swap in `easymode()`.
- [ ] Replace `exec()` + `types.ModuleType` with a proper Python module (rename `Password Generater` to `password_generator.py`).
- [ ] Run Flask with `debug=False` and use a production WSGI server (e.g., `waitress` or `gunicorn`) as an option.

### 📦 Storage & Data
- [ ] Replace Excel storage with a local **SQLite database** for better querying and duplicate detection.
- [ ] Add a **view/search saved passwords** page in the web UI.
- [ ] Add the ability to **delete** or **update** saved entries.
- [ ] Export saved passwords to CSV or JSON.

### 🌍 Deployment & Distribution
- [ ] Create a `requirements.txt` for clean dependency management.
- [ ] Package as a standalone desktop app with **PyInstaller** (no Python install required for end users).
- [ ] Add macOS (`.sh`) and Linux launch scripts alongside `run.bat`.
- [ ] Optional: Add Docker support for containerised deployment.

---

## 🤝 Contributing

This project started as a personal learning exercise. Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to GitHub: `git push origin feature/your-feature-name`
5. Open a Pull Request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and Python · <b>ProGen</b> — Generate. Copy. Save.
</p>
