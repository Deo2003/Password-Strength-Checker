def check_password_strength(password):
    feedback = []
    score = 0

    # Load common password list
    with open("10-million-password-list-top-1000000.txt", "r") as file:
        common_passwords = set(file.read().splitlines())

    # Length check
    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1
    else:
        feedback.append("Password is too short. Use at least 12 characters.")

    # Special characters
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 1
    else:
        feedback.append("Add special characters for better strength.")

    # Numbers
    if re.search(r"\d", password):
        score += 1
    else:
        feedback.append("Include numbers in your password.")

    # Upper and lower case
    if re.search(r"[A-Z]", password) and re.search(r"[a-z]", password):
        score += 2
    else:
        feedback.append("Use a mix of uppercase and lowercase letters.")

    # Common patterns
    if password.lower() in common_passwords:
        feedback.append("This password is too common. Choose something unique.")
        score -= 3

    # Final score and feedback
    strength = "Weak" if score < 3 else "Moderate" if score < 5 else "Strong"
    return {"score": score, "strength": strength, "feedback": feedback}
