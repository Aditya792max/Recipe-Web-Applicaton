import React from "react";

class Form extends React.Component {
          constructor(props) {
                    super(props);
                    this.state = { name: '', email: '', status: null, error: null };
          }
          handleChange = (e) => {
                    this.setState({ [e.target.name]: e.target.value });
          };
          handleSubmit = async (e) => {
                    e.preventDefault();
                    this.setState({ status: 'loading', error: null });

                    try {
                              const res = await fetch('http://localhost:8080/users/createUser', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                                  name: this.state.name,
                                                  email: this.state.email,
                                        })
                              });

                              if (!res.ok) {
                                        const err = await res.json().catch(() => ({}));
                                        throw new Error(err.error || `HTTP ${res.status}`);
                              }

                              await res.json();
                              this.setState({ status: 'success', name: '', email: '' });
                    } catch (err) {
                              this.setState({ status: 'error', error: err.message || 'Failed to submit' });
                    }
          };
          render() {
                    const { name, email, status, error } = this.state;

                    return (
                              <form
                                        onSubmit={this.handleSubmit}
                                        style={{ maxWidth: 420, margin: '2rem auto', display: 'grid', gap: 12 }}
                              >
                                        <h2>Contact Form</h2>

                                        <input
                                                  name="name"
                                                  placeholder="Your name"
                                                  value={name}
                                                  onChange={this.handleChange}
                                                  required
                                        />

                                        <input
                                                  name="email"
                                                  type="email"
                                                  placeholder="Your email"
                                                  value={email}
                                                  onChange={this.handleChange}
                                                  required
                                        />


                                        <button type="submit" disabled={status === 'loading'}>
                                                  {status === 'loading' ? 'Sending…' : 'Send'}
                                        </button>

                                        {status === 'success' && <p>✅ Saved to MongoDB!</p>}
                                        {status === 'error' && <p>❌ {error}</p>}
                              </form>
                    );
          }
}

export default Form;