import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../apiConfig';
import { FaTrash } from 'react-icons/fa';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${BASE_URL}contacts`, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setContacts(res.data);
        } catch (err) {
            console.error("Error fetching contacts", err);
        }
    };

    useEffect(() => {
        if (user && user.isAdmin) fetchContacts();
    }, [user]);

    const handleDeleteContact = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await axios.delete(`${BASE_URL}contacts/${id}`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                });
                fetchContacts();
            } catch (err) {
                console.error("Error deleting contact message", err);
            }
        }
    };

    return (
        <div>
            <h1 style={{ fontWeight: "500", fontSize: '32px', color: "var(--primary)", fontFamily: "'Playfair Display', serif", marginBottom: '30px' }}>Contact Messages</h1>

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', borderRadius: '10px', boxShadow: "0 4px 6px rgba(0,0,0,0.05)", overflowX: 'auto' }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Date</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Name</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Email</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Subject</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase' }}>Message</th>
                            <th style={{ padding: "12px 15px", color: 'var(--text-light)', fontSize: '12px', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(c => (
                            <tr key={c._id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <td style={{ padding: "15px", fontSize: '13px', color: 'var(--text-light)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: "15px", fontSize: '14px', fontWeight: '500' }}>{c.name}</td>
                                <td style={{ padding: "15px", fontSize: '14px' }}><a href={`mailto:${c.email}`} style={{ color: 'var(--primary)' }}>{c.email}</a></td>
                                <td style={{ padding: "15px", fontSize: '14px', textTransform: 'capitalize' }}>{c.subject || 'N/A'}</td>
                                <td style={{ padding: "15px", fontSize: '13px', maxWidth: "250px", color: 'var(--text-main)' }}>
                                    {c.message}
                                </td>
                                <td style={{ padding: "15px", textAlign: "center" }}>
                                    <button onClick={() => handleDeleteContact(c._id)} style={{ color: "#d32f2f", cursor: "pointer", background: "rgba(211, 47, 47, 0.1)", border: "none", padding: '8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} title="Delete Message">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {contacts.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: 'var(--text-light)' }}>No messages found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminContacts;
