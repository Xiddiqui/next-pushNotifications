'use client'; // Required for client-side interactivity

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  token: string;
  title: string;
  body: string;
}

export default function NotificationSender() {
  const [formData, setFormData] = useState<FormData>({
    token: '',
    title: '',
    body: ''
  });
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.success 
        ? 'Notification sent successfully!'
        : `Failed to send notification: ${data.error}`);
      
    } catch (error) {
      setMessage('Error sending notification: ' + 
        (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>iOS Notification Sender</h1>
      <div className="info-box">
        <h2>How to Send Notifications to iOS</h2>
        <p>
          To send a push notification to an iOS device, you need:
        </p>
        <ul>
          <li>The device token (from your iOS app)</li>
          <li>A title for the notification</li>
          <li>The message body</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="notification-form">
        <div className="form-group">
          <label htmlFor="token">Device Token:</label>
          <input
            type="text"
            id="token"
            name="token"
            value={formData.token}
            onChange={handleChange}
            placeholder="Enter device token"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Notification Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notification title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Notification Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter notification message"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Notification'}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
}