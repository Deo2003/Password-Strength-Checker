import re

def check_password_strength(password):
    import re

    score = 0
    feedback = []

    # Length check (30 points)
    if len(password) >= 12:
        score += 30
    elif len(password) >= 8:
        score += 20
        feedback.append("Password is a bit short. Use at least 12 characters.")
    else:
        feedback.append("Password is too short. Use at least 12 characters.")

    # Special characters (20 points)
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 20
    else:
        feedback.append("Add special characters for better strength.")

    # Numbers and character diversity (20 points)
    if re.search(r"\d", password):
        score += 10
    else:
        feedback.append("Include numbers in your password.")
    if re.search(r"[A-Z]", password) and re.search(r"[a-z]", password):
        score += 10
    else:
        feedback.append("Use a mix of uppercase and lowercase letters.")

    # Common patterns (30 points)
    with open("10-million-password-list-top-1000000.txt", "r") as file:
        common_passwords = set(file.read().splitlines())
    if password.lower() in common_passwords:
        feedback.append("This password is too common. Choose something unique.")
    else:
        score += 30

    # Cap the score at 100
    score = min(score, 100)
    strength = "Weak" if score < 40 else "Moderate" if score < 70 else "Strong"

    return {"score": score, "strength": strength, "feedback": feedback}
