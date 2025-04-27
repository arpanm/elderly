import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SOSButton from '../components/SOSButton';
import './Settings.css';

interface EmergencyContact {
  name: string;
  number: string;
}

interface Settings {
  // Personal Information
  name: string;
  age: string;
  sex: string;
  bloodGroup: string;
  photoIdNumber: string;
  photoIdProof: string;
  medicalInsuranceNumber: string;
  medicalInsuranceProof: string;
  
  // Contact Information
  contactNumber: string;
  address: string;
  email: string;
  emergencyContactNumber: string;
  emergencyContactRelationship: string;
  
  // Medical Information
  doctorName: string;
  doctorAppointmentNumber: string;
  doctorAppointmentAddress: string;
  
  // Service Providers
  plumberName: string;
  plumberNumber: string;
  electricianName: string;
  electricianNumber: string;
  
  // Bill Information
  electricityBillId: string;
  electricityBillLink: string;
  waterBillId: string;
  waterBillLink: string;
  
  // Shopping Information
  groceryStoreNumber: string;
  groceryStoreAddress: string;
  
  // Emergency Contacts
  emergencyContact1: EmergencyContact;
  emergencyContact2: EmergencyContact;
  emergencyContact3: EmergencyContact;
  
  // Personal Preferences
  favoriteMovies: string;
  favoriteSongs: string;
  favoriteSingers: string;
  favoriteSportsPersons: string;
  favoriteIdols: string;
  favoriteTopics: string;
  favoriteGenres: string;
}

interface FieldConfig {
  section: string;
  label: string;
  name: keyof Settings;
  type: 'text' | 'tel' | 'email' | 'url' | 'file';
  isFile?: boolean;
}

const fieldConfigs: FieldConfig[] = [
  // Personal Information
  { section: 'Personal Information', label: 'Name', name: 'name', type: 'text' },
  { section: 'Personal Information', label: 'Age', name: 'age', type: 'text' },
  { section: 'Personal Information', label: 'Sex', name: 'sex', type: 'text' },
  { section: 'Personal Information', label: 'Blood Group', name: 'bloodGroup', type: 'text' },
  { section: 'Personal Information', label: 'Photo ID Number', name: 'photoIdNumber', type: 'text' },
  { section: 'Personal Information', label: 'Photo ID Proof', name: 'photoIdProof', type: 'file', isFile: true },
  { section: 'Personal Information', label: 'Medical Insurance Number', name: 'medicalInsuranceNumber', type: 'text' },
  { section: 'Personal Information', label: 'Medical Insurance Proof', name: 'medicalInsuranceProof', type: 'file', isFile: true },
  
  // Contact Information
  { section: 'Contact Information', label: 'Contact Number', name: 'contactNumber', type: 'tel' },
  { section: 'Contact Information', label: 'Address', name: 'address', type: 'text' },
  { section: 'Contact Information', label: 'Email', name: 'email', type: 'email' },
  { section: 'Contact Information', label: 'Emergency Contact Number', name: 'emergencyContactNumber', type: 'tel' },
  { section: 'Contact Information', label: 'Emergency Contact Relationship', name: 'emergencyContactRelationship', type: 'text' },
  
  // Medical Information
  { section: 'Medical Information', label: 'Doctor Name', name: 'doctorName', type: 'text' },
  { section: 'Medical Information', label: 'Doctor Appointment Number', name: 'doctorAppointmentNumber', type: 'tel' },
  { section: 'Medical Information', label: 'Doctor Appointment Address', name: 'doctorAppointmentAddress', type: 'text' },
  
  // Service Providers
  { section: 'Service Providers', label: 'Plumber Name', name: 'plumberName', type: 'text' },
  { section: 'Service Providers', label: 'Plumber Number', name: 'plumberNumber', type: 'tel' },
  { section: 'Service Providers', label: 'Electrician Name', name: 'electricianName', type: 'text' },
  { section: 'Service Providers', label: 'Electrician Number', name: 'electricianNumber', type: 'tel' },
  
  // Bill Information
  { section: 'Bill Information', label: 'Electricity Bill ID', name: 'electricityBillId', type: 'text' },
  { section: 'Bill Information', label: 'Electricity Bill Link', name: 'electricityBillLink', type: 'url' },
  { section: 'Bill Information', label: 'Water Bill ID', name: 'waterBillId', type: 'text' },
  { section: 'Bill Information', label: 'Water Bill Link', name: 'waterBillLink', type: 'url' },
  
  // Shopping Information
  { section: 'Shopping Information', label: 'Grocery Store Number', name: 'groceryStoreNumber', type: 'tel' },
  { section: 'Shopping Information', label: 'Grocery Store Address', name: 'groceryStoreAddress', type: 'text' },
  
  // Personal Preferences
  { section: 'Personal Preferences', label: 'Favorite Movies', name: 'favoriteMovies', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Songs', name: 'favoriteSongs', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Singers', name: 'favoriteSingers', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Sports Persons', name: 'favoriteSportsPersons', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Idols', name: 'favoriteIdols', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Topics', name: 'favoriteTopics', type: 'text' },
  { section: 'Personal Preferences', label: 'Favorite Genres', name: 'favoriteGenres', type: 'text' }
];

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings>({
    // Personal Information
    name: 'Jivan Verma',
    age: '65',
    sex: 'Male',
    bloodGroup: 'O+',
    photoIdNumber: 'A12345678',
    photoIdProof: '',
    medicalInsuranceNumber: 'INS789012',
    medicalInsuranceProof: '',
    
    // Contact Information
    contactNumber: '+91 9912345678',
    address: '123 Maple Street, Apt 4B, Bangalore, KN 560001',
    email: 'amol@mail.com',
    emergencyContactNumber: '+91 9987654321',
    emergencyContactRelationship: 'Son',
    
    // Medical Information
    doctorName: 'Dr. Sarah Roy',
    doctorAppointmentNumber: '+91 9923456789',
    doctorAppointmentAddress: '456 Medical Center Drive, Suite 101, Bangalore, KN 5600002',
    
    // Service Providers
    plumberName: 'Mike\'s Plumbing Services',
    plumberNumber: '+91 9993456789',
    electricianName: 'Bright Electric Solutions',
    electricianNumber: '+91 99456117890',
    
    // Bill Information
    electricityBillId: 'ELEC789012',
    electricityBillLink: 'https://example.com/electricity-bill',
    waterBillId: 'WATER345678',
    waterBillLink: 'https://example.com/water-bill',
    
    // Shopping Information
    groceryStoreNumber: '+1 (555) 567-8901',
    groceryStoreAddress: '789 Market Street, New York, NY 10003',
    
    // Emergency Contacts
    emergencyContact1: { name: 'Jane Das', number: '+91 9298716543' },
    emergencyContact2: { name: 'Robert Smith', number: '+1 (555) 876-5432' },
    emergencyContact3: { name: 'Mary Kosi', number: '+91 9976514321' },
    
    // Personal Preferences
    favoriteMovies: 'The Shawshank Redemption, Forrest Gump, The Godfather',
    favoriteSongs: 'Yesterday, Imagine, What a Wonderful World',
    favoriteSingers: 'Frank Sinatra, Elvis Presley, Nat King Cole',
    favoriteSportsPersons: 'Roger Federer, Michael Jordan, Muhammad Ali',
    favoriteIdols: 'Mahatma Gandhi, Nelson Mandela, Mother Teresa',
    favoriteTopics: 'History, Science, Technology, Gardening',
    favoriteGenres: 'Classic Rock, Jazz, Classical, Blues'
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmergencyContactChange = (index: number, field: 'name' | 'number', value: string) => {
    setSettings(prev => {
      const contactKey = `emergencyContact${index}` as keyof Settings;
      const currentContact = prev[contactKey] as EmergencyContact;
      return {
        ...prev,
        [contactKey]: {
          ...currentContact,
          [field]: value
        }
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          [field]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleSOSClick = () => {
    // Call emergency contacts
    const emergencyContacts = [
      { name: 'Jane Das', number: '+91 9298716543' },
      { name: 'Robert Smith', number: '+1 (555) 876-5432' },
      { name: 'Mary Kosi', number: '+91 9976514321' }
    ];
    
    // Announce SOS activation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('SOS activated! Calling emergency contacts.');
      window.speechSynthesis.speak(utterance);
    }

    // Simulate calling emergency contacts
    emergencyContacts.forEach(contact => {
      console.log(`Calling ${contact.name} at ${contact.number}`);
    });
  };

  const renderFormFields = () => {
    const sections = Array.from(new Set(fieldConfigs.map(config => config.section)));
    
    return sections.map(section => (
      <section key={section} className="settings-section">
        <h2>{section}</h2>
        {fieldConfigs
          .filter(config => config.section === section)
          .map(config => (
            <div key={config.name} className="form-group">
              <label>{config.label}:</label>
              {config.isFile ? (
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, config.name)}
                />
              ) : (
                <input
                  type={config.type}
                  name={config.name}
                  value={settings[config.name] as string}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
      </section>
    ));
  };

  return (
    <div className="settings-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      
      <h1>Settings</h1>
      
      <div className="settings-form">
        {renderFormFields()}
        
        <section className="settings-section">
          <h2>Local Friend & Relatives</h2>
          {[1, 2, 3].map((index) => (
            <div key={index} className="emergency-contact-group">
              <div className="form-group">
                <label>Contact {index} Name:</label>
                <input
                  type="text"
                  value={(settings[`emergencyContact${index}` as keyof Settings] as EmergencyContact).name}
                  onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Contact {index} Number:</label>
                <input
                  type="tel"
                  value={(settings[`emergencyContact${index}` as keyof Settings] as EmergencyContact).number}
                  onChange={(e) => handleEmergencyContactChange(index, 'number', e.target.value)}
                />
              </div>
            </div>
          ))}
        </section>

        <button className="save-button" onClick={handleSave}>
          Save Settings
        </button>
      </div>
      <SOSButton onSOSClick={handleSOSClick} />
      <div className="bottom-padding" />
    </div>
  );
};

export default Settings; 