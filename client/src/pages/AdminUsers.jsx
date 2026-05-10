import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}users`, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchUsers();
    }, [user]);

    return (
        <div>
            <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>User Management</h1>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflowX: 'auto' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: '600px' }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Username</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Role</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Joined Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '500' }}>{u.username}</td>
                                <td style={{ padding: "15px", fontSize: '14px' }}>{u.email}</td>
                                <td style={{ padding: "15px", fontSize: '14px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        backgroundColor: u.isAdmin ? 'rgba(46, 125, 50, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                        color: u.isAdmin ? '#2e7d32' : 'var(--text-light)',
                                        textTransform: 'uppercase'
                                    }}>
                                        {u.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td style={{ padding: "15px", fontSize: '13px', color: 'var(--text-light)' }}>
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: "30px", textAlign: "center", color: 'var(--text-light)' }}>No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
