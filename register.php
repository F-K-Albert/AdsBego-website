<?php
session_start();

// Redirect to dashboard if already logged in
if (isset($_SESSION['partner_id'])) {
    header('Location: dashboard.php');
    exit();
}

// Include database configuration
require_once 'config.php';

// Handle registration form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    // Validate inputs
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters";
    }
    
    if ($password !== $confirm_password) {
        $errors[] = "Passwords do not match";
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM partners WHERE email = ?");
    $stmt->execute([$email]);
    
    if ($stmt->rowCount() > 0) {
        $errors[] = "Email already registered";
    }
    
    // If no errors, create account
    if (empty($errors)) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $partner_code = 'PART' . strtoupper(bin2hex(random_bytes(4)));
        
        try {
            $stmt = $pdo->prepare("INSERT INTO partners (name, email, password, partner_code, created_at) VALUES (?, ?, ?, ?, NOW())");
            $stmt->execute([$name, $email, $hashed_password, $partner_code]);
            
            // Get the new partner ID
            $partner_id = $pdo->lastInsertId();
            
            // Set session variables
            $_SESSION['partner_id'] = $partner_id;
            $_SESSION['partner_name'] = $name;
            $_SESSION['partner_email'] = $email;
            $_SESSION['last_activity'] = time();
            
            // Redirect to dashboard
            header('Location: dashboard.php');
            exit();
            
        } catch(PDOException $e) {
            $errors[] = "Registration failed: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partner Registration</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Similar styles as login.php, with some adjustments */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .register-container {
            background: white;
            padding: 2.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 450px;
        }
        .register-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .register-header h2 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .register-header p {
            color: #7f8c8d;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #2c3e50;
            font-weight: 500;
        }
        .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        .form-control:focus {
            border-color: #3498db;
            outline: none;
        }
        .btn {
            width: 100%;
            padding: 0.75rem;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #27ae60;
        }
        .error-message {
            color: #e74c3c;
            margin-bottom: 1rem;
            padding: 0.5rem;
            background-color: #fadbd8;
            border-radius: 5px;
        }
        .login-link {
            text-align: center;
            margin-top: 1.5rem;
            color: #7f8c8d;
        }
        .login-link a {
            color: #3498db;
            text-decoration: none;
        }
        .password-hint {
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-top: 0.25rem;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <div class="register-header">
            <h2>Become a Partner</h2>
            <p>Create your investment partner account</p>
        </div>
        
        <?php if (!empty($errors)): ?>
            <?php foreach ($errors as $error): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i> <?= htmlspecialchars($error) ?>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
        
        <form action="register.php" method="POST">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-control" required>
                <div class="password-hint">Minimum 8 characters</div>
            </div>
            
            <div class="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" class="form-control" required>
            </div>
            
            <input type="hidden" name="register" value="1">
            <button type="submit" class="btn">Register</button>
        </form>
        
        <div class="login-link">
            Already have an account? <a href="login.php">Login here</a>
        </div>
    </div>
</body>
</html>