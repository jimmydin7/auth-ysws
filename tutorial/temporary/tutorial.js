const jsonContainer = document.getElementById('json-container');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const languageSelect = document.getElementById('language-select');
const codeBox = document.getElementById('code-box');
const codeContent = document.getElementById('code-content');

const tutorials = [
    {
        "id": 0,
        "title": "Welcome!",
        "description": "Hey there! This is just a quick, friendly demo.",
        "content": "We’re not going to cover everything about authentication here, just the basics, in a way that’s easy to follow. If you want to go deeper, check out the docs or ask a friend! Hit Next to start learning.",
        "code_snippets": {}
    },
    {
        "id": 1,
        "title": "What’s Auth All About?",
        "description": "Let’s talk about why apps need to know who you are.",
        "content": "Authentication is just a fancy word for ‘proving who you are’ online. It’s like showing your ID at a club, but for websites. Usually, you log in with a password, and the site remembers you. We’ll break it down step by step, so don’t worry if it sounds complicated!",
        "code_snippets": {},
        "next": 2
    },
    {
        "id": 2,
        "title": "How Do Sites Remember You?",
        "description": "Sessions are like your VIP wristband.",
        "content": "After you log in, the website gives you a ‘session’—think of it as a wristband that says ‘I belong here!’ The server keeps your info safe, and your browser gets a special cookie. Here’s how you’d set up a session in different frameworks (don’t stress about the details yet):",
        "code_snippets": {
            "flask": {"language": "python", "code": "from flask import session\nsession['user'] = 'jimmy'"},
            "express": {"language": "javascript", "code": "req.session.user = 'jimmy';"},
            "django": {"language": "python", "code": "request.session['user'] = 'jimmy'"}
        },
        "next": 3
    },
    {
        "id": 3,
        "title": "Don’t Store Passwords as-is!",
        "description": "Seriously, never keep real passwords in your code.",
        "content": "If someone sneaks a peek at your database, you don’t want them to see everyone’s real password! That’s why we use ‘hashing’—it scrambles the password so only the computer can check it. Here’s how you hash a password in each framework. (No need to memorize—just get the idea!)",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "from werkzeug.security import generate_password_hash, check_password_hash\nhashed_pw = generate_password_hash('mypassword')\n# Flask salts passwords (adds random characters stored in the database)\n# Use this to check it:\ncheck_password_hash(hashed_pw, 'mypassword')"
            },
            "express": {
                "language": "javascript",
                "code": "const bcrypt = require('bcrypt');\nconst hash = await bcrypt.hash('mypassword', 10);"
            },
            "django": {
                "language": "python",
                "code": "from django.contrib.auth.hashers import make_password, check_password\nhashed_pw = make_password('mypassword')\n# Django salts passwords (adds random characters stored in the database)\n# Use this to check it:\ncheck_password('mypassword', hashed_pw)"
            }
        },
        "next": 4
    },
    {
        "id": 4,
        "title": "Let’s Set Up Your Project",
        "description": "Time to get your tools ready!",
        "content": "Before we write any code, let’s make sure you’ve got everything installed. Here’s how to set up your project in each framework:",
        "code_snippets": {
            "flask": {"language": "bash", "code": "pip install flask"},
            "express": {"language": "bash", "code": "npm init -y && npm install express express-session bcrypt"},
            "django": {"language": "bash", "code": "pip install django && django-admin startproject auth_project"}
        }
    },
    {
        "id": 5,
        "title": "Your First Tiny Server",
        "description": "Let’s get something running!",
        "content": "Here’s the smallest server you can make. It won’t log anyone in yet, but it’ll prove your setup works. Try it out!",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef home():\n    return 'Hello'\n\napp.run()"
            },
            "express": {
                "language": "javascript",
                "code": "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello'));\napp.listen(3000);"
            },
            "django": {
                "language": "bash",
                "code": "python3 manage.py runserver"
            }
        }
    },
    {
        "id": 6,
        "title": "How Do You Send Data?",
        "description": "POST is how you talk to the server.",
        "content": "When you log in or sign up, your info gets sent to the server using something called POST. Here’s how you’d handle that in each framework:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "@app.route('/submit', methods=['POST'])\ndef submit():\n    data = request.json"
            },
            "express": {
                "language": "javascript",
                "code": "app.use(express.json());\napp.post('/submit', (req, res) => {\n  const data = req.body;\n})"
            },
            "django": {"language": "python", "code": "data = json.loads(request.body)"}
        }
    },
    {
        "id": 7,
        "title": "Where Do Users Go?",
        "description": "Let’s save a user (just for now).",
        "content": "We’ll use a simple dictionary or object to save users for now. This is just for learning—real apps use databases!",
        "code_snippets": {
            "flask": {"language": "python", "code": "users = {}\nusers['alice'] = 'pass123'"},
            "express": {"language": "javascript", "code": "const users = {};\nusers['alice'] = 'pass123';"},
            "django": {"language": "python", "code": "users = {}\nusers['alice'] = 'pass123'"}
        }
    },
    {
        "id": 8,
        "title": "Hash That Password!",
        "description": "Never store the real thing.",
        "content": "Before you save a password, scramble it! Here’s how to hash a password in each framework:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "from werkzeug.security import generate_password_hash\nhashed = generate_password_hash('mypw')"
            },
            "express": {"language": "javascript", "code": "const hash = await bcrypt.hash('mypw', 10);"},
            "django": {
                "language": "python",
                "code": "from django.contrib.auth.hashers import make_password\nhashed = make_password('mypw')"
            }
        }
    },
    {
        "id": 9,
        "title": "Sign Up Logic (The Fun Part)",
        "description": "Let’s accept a username and password!",
        "content": "Here’s how you’d write a signup route that saves a new user, with their password hashed for safety:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "# in /signup POST:\nusers[username] = generate_password_hash(password)"
            },
            "express": {
                "language": "javascript",
                "code": "// in /signup POST:\nusers[username] = await bcrypt.hash(password, 10);"
            },
            "django": {"language": "python", "code": "# in /signup:\nusers[username] = make_password(password)"}
        }
    },
    {
        "id": 10,
        "title": "How Do You Log In?",
        "description": "Check the password, but don’t peek!",
        "content": "When someone tries to log in, you check if their username exists and if their password matches the (hashed) one you saved. Here’s how you’d do that:",
        "code_snippets": {
            "flask": {"language": "python", "code": "check_password_hash(users[username], password)"},
            "express": {"language": "javascript", "code": "await bcrypt.compare(password, users[username])"},
            "django": {"language": "python", "code": "check_password(password, users[username])"}
        }
    },
    {
        "id": 11,
        "title": "Remembering Who’s Logged In",
        "description": "Sessions keep you logged in as you browse.",
        "content": "After a successful login, you want to remember the user. That’s what sessions are for! Here’s how you’d set a session in each framework:",
        "code_snippets": {
            "flask": {"language": "python", "code": "session['user_id'] = user.id"},
            "express": {"language": "javascript", "code": "req.session.userId = user.id;"},
            "django": {"language": "python", "code": "request.session['user_id'] = user.id"}
        },
        "next": 12
    },
    {
        "id": 12,
        "title": "How Do You Check If Someone’s Logged In?",
        "description": "Just look for their session!",
        "content": "To keep pages private, check if the user’s session has their ID. If it does, they’re logged in! Here’s how you’d check in each framework:",
        "code_snippets": {
            "flask": {"language": "python", "code": "if 'user_id' in session:  # user is logged in"},
            "express": {"language": "javascript", "code": "if (req.session.userId) { /* user is logged in */ }"},
            "django": {"language": "python", "code": "if request.session.get('user_id'):  # user is logged in"}
        },
        "next": 13
    },
    {
        "id": 13,
        "title": "Show a Profile Page (If Logged In)",
        "description": "Only let logged-in users see their profile.",
        "content": "You want to show a profile page only if the user is logged in. Otherwise, send them to the login page. Here’s how you’d do it:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "if 'user_id' in session:\n    return render_template('profile.html')\nelse:\n    return redirect('/login')"
            },
            "express": {
                "language": "javascript",
                "code": "if (req.session.userId) {\n  res.render('profile');\n} else {\n  res.redirect('/login');\n}"
            },
            "django": {
                "language": "python",
                "code": "if request.session.get('user_id'):\n    return render(request, 'profile.html')\nelse:\n    return redirect('/login')"
            }
        },
        "next": 14
    },
    {
        "id": 14,
        "title": "Keep Out If Not Logged In!",
        "description": "Block access to private pages.",
        "content": "Don’t let people see private pages unless they’re logged in! Here’s how you’d block access in each framework:",
        "code_snippets": {
            "flask": {"language": "python", "code": "if 'user_id' not in session:\n    return redirect('/login')"},
            "express": {"language": "javascript", "code": "if (!req.session.userId) {\n  res.redirect('/login');\n}"},
            "django": {
                "language": "python",
                "code": "if not request.session.get('user_id'):\n    return redirect('/login')"
            }
        },
        "next": 15
    },
    {
        "id": 15,
        "title": "Logging Out (See Ya!)",
        "description": "Here’s how to log someone out.",
        "content": "Logging out just means clearing the user’s session. Here’s how you’d do it in each framework:",
        "code_snippets": {
            "flask": {"language": "python", "code": "session.pop('user_id', None)"},
            "express": {"language": "javascript", "code": "req.session.destroy();"},
            "django": {"language": "python", "code": "request.session.flush()"}
        },
        "next": 16
    },
    {
        "id": 16,
        "title": "Reset Everything (Just in Case)",
        "description": "How to clear all session data.",
        "content": "Sometimes you want to clear all session data, not just log out. Maybe for security, or if a user changes their password. Here’s how you’d do it:",
        "code_snippets": {
            "flask": {"language": "python", "code": "session.clear()"},
            "express": {
                "language": "javascript",
                "code": "req.session.regenerate(function(err) {\n  /* new session */\n});"
            },
            "django": {"language": "python", "code": "request.session.flush()"}
        },
        "next": 17
    },
    {
        "id": 17,
        "title": "What’s a Cookie?",
        "description": "Cookies help the server remember you.",
        "content": "Cookies are tiny pieces of data your browser stores for a website. In authentication, they usually hold a session ID so the server knows who you are. Here’s how you’d see or use cookies in each framework:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "# Flask sets a session cookie automatically\n# You can access it with request.cookies.get('session')"
            },
            "express": {
                "language": "javascript",
                "code": "// Express-session sets a cookie\nreq.cookies['connect.sid']"
            },
            "django": {
                "language": "python",
                "code": "# Django sets a sessionid cookie\nrequest.COOKIES.get('sessionid')"
            }
        },
        "next": 18
    },
    {
        "id": 18,
        "title": "Protecting Pages with Middleware",
        "description": "Run code before letting users in.",
        "content": "Middleware is just code that runs before your route handler. You can use it to check if a user is logged in and block access if not. Here’s how you’d do it:",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "@app.before_request\ndef require_login():\n    if not session.get('user_id') and request.endpoint == 'profile':\n        return redirect('/login')"
            },
            "express": {
                "language": "javascript",
                "code": "function requireLogin(req, res, next) {\n  if (!req.session.userId) {\n    return res.redirect('/login');\n  }\n  next();\n}\napp.use('/profile', requireLogin);"
            },
            "django": {
                "language": "python",
                "code": "from django.contrib.auth.decorators import login_required\n@login_required\ndef profile(request):\n    ..."
            }
        },
        "next": 19
    },
    {
        "id": 19,
        "title": "Keep Your Code Tidy!",
        "description": "A little organization goes a long way.",
        "content": "As your project grows, keep your code neat! Move repeated checks into functions or middleware, and keep your routes clean and readable. It’ll make your life way easier down the road.",
        "code_snippets": {
            "flask": {
                "language": "python",
                "code": "def is_logged_in():\n    return 'user_id' in session\n# Use is_logged_in() in your routes"
            },
            "express": {
                "language": "javascript",
                "code": "function isLoggedIn(req) {\n  return !!req.session.userId;\n}\n// Use isLoggedIn(req) in your routes"
            },
            "django": {
                "language": "python",
                "code": "def is_logged_in(request):\n    return request.session.get('user_id')\n# Use is_logged_in(request) in your views"
            }
        },
        "next": 20
    }
];

let currentId = 0;
const maxId = tutorials.length - 1;

const languages = [
    {key: 'flask', label: 'Flask'},
    {key: 'express', label: 'Express'},
    {key: 'django', label: 'Django'}
];
let currentLanguage = 'flask';

function renderLanguageTabs() {
    const tabs = languages.map(lang =>
        `<button class="lang-tab ${currentLanguage === lang.key ? 'bg-yellow-400 text-black selected' : 'bg-gray-700 text-white'} px-4 py-2 rounded-t font-bold mr-2" data-lang="${lang.key}">${lang.label}</button>`
    ).join('');
    document.getElementById('language-tabs').innerHTML = tabs;
    document.querySelectorAll('.lang-tab').forEach(btn => {
        btn.onclick = (e) => {
            currentLanguage = btn.getAttribute('data-lang');
            displayTutorial(currentId);
        };
    });
}

function getPrismLanguage(langKey) {
    if (langKey === 'flask' || langKey === 'django') return 'python';
    if (langKey === 'express') return 'javascript';
    return '';
}

function displayTutorial(id) {
    const tutorial = tutorials.find(t => t.id === id);
    if (!tutorial) {
        jsonContainer.textContent = 'Tutorial not found.';
        codeContent.textContent = '';
        return;
    }
    let html = `<h2 class='text-3xl font-bold mb-4'>${tutorial.title}</h2>`;
    html += `<h3 class='text-xl mb-4 text-yellow-300'>${tutorial.description}</h3>`;
    html += `<p class='mb-6 whitespace-pre-line leading-relaxed'>${tutorial.content}</p>`;
    jsonContainer.innerHTML = html;

    renderLanguageTabs();


    let code = '';
    let prismLang = getPrismLanguage(currentLanguage);
    if (tutorial.code_snippets && tutorial.code_snippets[currentLanguage]) {
        code = tutorial.code_snippets[currentLanguage].code;
        codeContent.className = `language-${prismLang} block text-base`;
        codeContent.textContent = code;
        codeBox.style.display = '';
        if (window.Prism) Prism.highlightElement(codeContent);
    } else {
        codeContent.className = 'block text-base';
        codeContent.textContent = 'This tutorial includes no code snippets.';
        codeBox.style.display = '';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentId < maxId) {
        currentId++;
        displayTutorial(currentId);
    } else {
        alert('This is the last file');
    }
});

backBtn.addEventListener('click', () => {
    if (currentId > 0) {
        currentId--;
        displayTutorial(currentId);
    } else {
        alert('This is the first file');
    }
});

displayTutorial(currentId);


