const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', order_id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
