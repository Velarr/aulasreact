import React, { useState } from 'react';

const FormRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    pass: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/contatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados");

      const result = await response.json();
      alert('Utilizador registrado com sucesso!');
      setFormData({ email: '', pass: '' });
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro ao registar utilizador.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registo</h2>

      <div>
        <label>Email:</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Pass:</label><br />
        <input
          type="password"
          name="pass"
          value={formData.pass}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Registar</button>
    </form>
  );
};

export default FormRegister;
