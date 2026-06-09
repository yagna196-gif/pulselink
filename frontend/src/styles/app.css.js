import React from 'react';

export const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Home Page */
  .home {
    text-align: center;
    color: white;
    padding: 60px 20px;
  }

  .home h1 {
    font-size: 3.5rem;
    margin-bottom: 10px;
  }

  .home > p {
    font-size: 1.3rem;
    margin-bottom: 40px;
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 60px;
  }

  .btn {
    padding: 15px 40px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background-color: #ff6b6b;
    color: white;
  }

  .btn-primary:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background-color: white;
    color: #667eea;
  }

  .btn-secondary:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }

  .features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 40px;
    background: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
  }

  .feature h3 {
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .feature ul {
    list-style: none;
    text-align: left;
  }

  .feature li {
    padding: 10px 0;
    font-size: 1.1rem;
  }

  /* Forms */
  form {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    margin: 30px auto;
  }

  form h1 {
    margin-bottom: 20px;
    color: #333;
  }

  input, select, textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    font-family: inherit;
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.5);
  }

  button[type="submit"] {
    width: 100%;
    padding: 12px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[type="submit"]:hover:not(:disabled) {
    background-color: #5568d3;
  }

  button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error {
    color: #ff6b6b;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #ffe0e0;
    border-radius: 5px;
  }

  .success {
    color: #51cf66;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #e7f5ea;
    border-radius: 5px;
  }

  /* Dashboard */
  .donor-dashboard, .patient-request {
    color: white;
    padding: 40px 20px;
  }

  .requests-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .request-card {
    background: white;
    color: #333;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .request-card h3 {
    color: #ff6b6b;
    margin-bottom: 15px;
  }

  .request-card p {
    margin-bottom: 10px;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .actions button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  .accept {
    background-color: #51cf66;
    color: white;
  }

  .decline {
    background-color: #ff6b6b;
    color: white;
  }

  .accept:hover {
    background-color: #40c057;
  }

  .decline:hover {
    background-color: #ff5252;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .home h1 {
      font-size: 2rem;
    }

    .features {
      grid-template-columns: 1fr;
    }

    .cta-buttons {
      flex-direction: column;
    }
  }
`;

export default styles;
