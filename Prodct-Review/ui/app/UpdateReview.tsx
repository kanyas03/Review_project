// app/updateReview.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, Alert, ScrollView,TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function UpdateReview() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [productName, setProductName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchReview();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`);
      const data = await res.json();
      setProductName(data.productName);
      setReviewText(data.reviewText);
      setRating(data.rating);
      setUsername(data.username);
      if (data.image) {
        setImage({ uri: `http://localhost:3000/${data.image}` });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    formData.append('username', username);

    if (image && image.uri?.startsWith('file')) {
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'updated.jpg',
      } as any);
    }

    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.ok) {
        Alert.alert('Success', 'Review updated!');
        router.push('/View-Review');
      } else {
        Alert.alert('Error', 'Failed to update review');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formBox}>
        <Text style={styles.title}>Update Review</Text>

        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Review"
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

<TouchableOpacity style={styles.imageButton} onPress={pickImage}>
  <Text style={styles.imageButtonText}>Pick New Image (Optional)</Text>
</TouchableOpacity>

{image && (
  <Image source={{ uri: image.uri }} style={styles.preview} />
)}


        <Button title="Update Review" onPress={handleUpdate} color="#3c8256" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#9DCF8E',
    flexGrow: 1,
  },
  formBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e6d3f',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  preview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },

  imageButton: {
    backgroundColor: '#3c8256',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  
  imageButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  
  
});
