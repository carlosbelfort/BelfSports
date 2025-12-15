import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação acadêmica
  if (email === 'admin@email.com' && senha === '123456') {
    return res.json({
      success: true,
      user: {
        email,
        role: 'admin'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Credenciais inválidas'
  });
});

export default router;