import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import type { GuestSetupData } from '../../Context/AuthContext';
import { useWorkout } from '../../Context/WorkoutContext';
import { generateWorkoutPlan } from '../../Logic/PlanGenerator';
import './GuestSetup.css';

const GuestSetup = () => {
  const { continueAsGuest } = useAuth();
  const { savePlan, exercises } = useWorkout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<GuestSetupData>({
    weight: 70,
    birthday: '',
    gender: 'male',
    hasWeights: false,
    goal: 'muscle_growth',
    frequency: 3,
    sessionLength: 30,
  });

  const set = (field: keyof GuestSetupData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      continueAsGuest(form);
      const guestProfile = { _id: 'guest', username: 'Guest', isGuest: true as const, ...form };
      const plan = generateWorkoutPlan(guestProfile, exercises);
      await savePlan(plan);
      navigate('/plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card reg-card">
        <div className="auth-logo">🏋️</div>
        <h1 className="auth-title">Quick Setup</h1>
        <p className="auth-subtitle">Tell us about yourself to build your plan — no account needed</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="reg-grid">
            <div className="field-group">
              <label className="field-label">Weight (kg)</label>
              <input className="field-input" type="number" min={20} max={300} value={form.weight} onChange={set('weight')} required />
            </div>
            <div className="field-group">
              <label className="field-label">Date of Birth</label>
              <input className="field-input" type="date" max={new Date().toISOString().split('T')[0]} value={form.birthday} onChange={set('birthday')} required />
            </div>
            <div className="field-group">
              <label className="field-label">Gender</label>
              <select className="field-input" value={form.gender} onChange={set('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Goal</label>
              <select className="field-input" value={form.goal} onChange={set('goal')}>
                <option value="muscle_growth">Muscle Growth</option>
                <option value="weight_loss">Weight Loss</option>
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Days per week</label>
              <input className="field-input" type="number" min={1} max={7} value={form.frequency} onChange={set('frequency')} required />
            </div>
            <div className="field-group">
              <label className="field-label">Session length (min)</label>
              <input className="field-input" type="number" min={10} max={120} value={form.sessionLength} onChange={set('sessionLength')} required />
            </div>
          </div>
          <div className="field-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.hasWeights} onChange={set('hasWeights')} />
              <span>I have weights at home</span>
            </label>
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Building your plan...' : 'Get My Plan'}
          </button>
        </form>
        <p className="auth-switch">
          Want to save your progress? <Link to="/register">Create an account</Link>
        </p>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export { GuestSetup };
