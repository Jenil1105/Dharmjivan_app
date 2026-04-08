import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native'

type ActiveView = 'dashboard' | 'add-item' | 'items'

interface AddItemScreenProps {
  setActiveView: (view: ActiveView) => void
  mode?: 'add' | 'edit'
  initialData?: any
  onSuccess?: () => void
}

const initialFormState = {
  name: '',
  description: '',
  price: '',
  discounted_price: '',
  available_quantity: '',
  category: '',
  image_url: '',
}

const AddItemScreen: React.FC<AddItemScreenProps> = ({
  setActiveView,
  mode = 'add',
  initialData = null,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(
    initialData
      ? {
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        discounted_price: initialData.discounted_price || '',
        available_quantity: initialData.available_quantity || '',
        category: initialData.category || '',
        image_url: initialData.image_url || '',
      }
      : initialFormState
  )
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        discounted_price: parseFloat(formData.discounted_price) || 0,
        available_quantity: parseInt(formData.available_quantity, 10) || 0,
      }

      const url = mode === 'edit' && initialData?._id
        ? `http://ec2-52-66-25-4.ap-south-1.compute.amazonaws.com:3000/items/${initialData._id}`
        : 'http://ec2-52-66-25-4.ap-south-1.compute.amazonaws.com:3000/items'

      const method = mode === 'edit' ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setMessage(mode === 'edit' ? 'Item updated successfully!' : 'Item added successfully!')

      setFormData(initialFormState)
      if (onSuccess) onSuccess()
      // Navigate back to dashboard or items
      setActiveView('dashboard')
    } catch (error: any) {
      setMessage(`Error ${mode === 'edit' ? 'updating' : 'adding'} item: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveView('dashboard')} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>
            <View>
              <Text style={styles.entryFormText}>Entry form</Text>
              <Text style={styles.title}>
                {mode === 'edit' ? 'Edit Item' : 'Add New Item'}
              </Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            Fill in the core details below to publish a new product to the store inventory.
          </Text>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Product name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleChange('name', value)}
                  placeholder="Groundnut Oil 1L"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                  style={styles.input}
                  value={formData.category}
                  onChangeText={(value) => handleChange('category', value)}
                  placeholder="Oil, Seeds, Snacks"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(value) => handleChange('description', value)}
                placeholder="Describe texture, sourcing, packaging, or ideal use cases."
                multiline
                numberOfLines={5}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price (INR)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(value) => handleChange('price', value)}
                  placeholder="0.00"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Discounted price</Text>
                <TextInput
                  style={styles.input}
                  value={formData.discounted_price}
                  onChangeText={(value) => handleChange('discounted_price', value)}
                  placeholder="Optional"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Available Qty.</Text>
                <TextInput
                  style={styles.input}
                  value={formData.available_quantity}
                  onChangeText={(value) => handleChange('available_quantity', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input}
                value={formData.image_url}
                onChangeText={(value) => handleChange('image_url', value)}
                placeholder="https://example.com/product-image.jpg"
                keyboardType="url"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Text style={styles.note}>Required fields help keep listings complete and searchable.</Text>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading
                    ? mode === 'edit'
                      ? 'Updating item...'
                      : 'Saving item...'
                    : mode === 'edit'
                      ? 'Update item'
                      : 'Publish item'}
                </Text>
              </TouchableOpacity>
              {mode === 'edit' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setActiveView('dashboard')}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>

            {message ? (
              <View style={[styles.message, message.includes('Error') && styles.errorMessage]}>
                <Text style={styles.messageText}>{message}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#EF4444',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECACA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  entryFormText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2.8,
    color: '#EF4444',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  form: {
    // Form styles
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    paddingTop: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
  },
  note: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#EF4444',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cancelText: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '600',
  },
  message: {
    marginTop: 16,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    backgroundColor: '#FFFBEB',
  },
  errorMessage: {
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F59E0B',
  },
})

export default AddItemScreen