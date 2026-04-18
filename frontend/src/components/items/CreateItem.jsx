import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './CreateItem.css';

function CreateItem({ onItemCreated }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { api } = useAuth();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setServerError('');
      setSuccessMessage('');
      setLoading(true);

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('condition', data.condition);
      formData.append('location', data.location);
      formData.append('contactPhone', data.contactPhone);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await api.post('/items/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Item created successfully!');
      reset();
      setImagePreview(null);
      setTimeout(() => {
        onItemCreated();
      }, 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-item-container">
      <h2>Post Your Cycle</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="create-item-form">
        {serverError && <div className="error-message">{serverError}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Cycle Title *</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Mountain Bike 21-Speed"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 5, message: 'Title must be at least 5 characters' },
              })}
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="field-error">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
              })}
              className={errors.price ? 'input-error' : ''}
            />
            {errors.price && <span className="field-error">{errors.price.message}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            placeholder="Describe your cycle condition, features, and reason for selling..."
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 20, message: 'Description must be at least 20 characters' },
            })}
            className={errors.description ? 'input-error' : ''}
            rows={5}
          />
          {errors.description && <span className="field-error">{errors.description.message}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="condition">Condition *</label>
            <select
              id="condition"
              {...register('condition', { required: 'Condition is required' })}
              className={errors.condition ? 'input-error' : ''}
            >
              <option value="">Select Condition</option>
              <option value="like-new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
            {errors.condition && <span className="field-error">{errors.condition.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              placeholder="Campus location or area"
              {...register('location', {
                required: 'Location is required',
              })}
              className={errors.location ? 'input-error' : ''}
            />
            {errors.location && <span className="field-error">{errors.location.message}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone *</label>
          <input
            id="contactPhone"
            type="tel"
            placeholder="Your phone number"
            {...register('contactPhone', {
              required: 'Contact phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            })}
            className={errors.contactPhone ? 'input-error' : ''}
          />
          {errors.contactPhone && <span className="field-error">{errors.contactPhone.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image *</label>
          <div className="image-input-wrapper">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleImageChange(e);
              }}
              {...register('image', {
                required: 'Image is required',
                validate: (files) => files && files.length > 0 || 'Please select an image'
              })}
              className={errors.image ? 'input-error' : ''}
            />
            <span className="image-hint">JPG, PNG or GIF (max 5MB)</span>
          </div>
          {errors.image && <span className="field-error">{errors.image.message}</span>}
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <p>Image Preview</p>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Posting...' : 'Post Item'}
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
