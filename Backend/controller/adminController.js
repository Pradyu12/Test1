// controllers/adminController.js
const pool = require('../config/db');

const adminController = {
    getDashboard: async (req, res) => {
        try {
            const [totalUsers] = await pool.query('SELECT COUNT(*) as count FROM users');
            const [totalProducts] = await pool.query('SELECT COUNT(*) as count FROM products');
            const [totalOrders] = await pool.query('SELECT COUNT(*) as count FROM orders');
            const [totalRevenue] = await pool.query('SELECT SUM(total) as total FROM orders WHERE status = "delivered"');
            
            res.json({
                success: true,
                stats: {
                    users: totalUsers[0].count,
                    products: totalProducts[0].count,
                    orders: totalOrders[0].count,
                    revenue: totalRevenue[0].total || 0
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getAllUsers: async (req, res) => {
        try {
            const [users] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users');
            res.json({ success: true, users });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getAllProducts: async (req, res) => {
        try {
            const [products] = await pool.query('SELECT * FROM products');
            res.json({ success: true, products });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getAllOrders: async (req, res) => {
        try {
            const [orders] = await pool.query(`
                SELECT o.*, u.name as user_name, u.email 
                FROM orders o 
                JOIN users u ON o.user_id = u.id 
                ORDER BY o.created_at DESC
            `);
            res.json({ success: true, orders });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
            res.json({ success: true, message: 'Order status updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = adminController;