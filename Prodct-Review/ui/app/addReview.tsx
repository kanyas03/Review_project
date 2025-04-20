// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Button,
//   Image,
//   Alert,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function AddReview() {
//   const [productName, setProductName] = useState('');
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState('');
//   const [username, setUsername] = useState('');
//   const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!productName || !reviewText || !rating || !username) {
//       Alert.alert('Please fill all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('productName', productName);
//     formData.append('reviewText', reviewText);
//     formData.append('rating', rating);
//     formData.append('username', username);

//     if (image) {
//       formData.append('image', {
//         uri: image.uri,
//         type: 'image/jpeg',
//         name: 'review.jpg',
//       } as any);
//     }

//     try {
//       const response = await fetch('http://localhost:3000/reviews', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Review added successfully');
//         setProductName('');
//         setReviewText('');
//         setRating('');
//         setUsername('');
//         setImage(null);
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Failed to submit review');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.formBox}>
//         <Text style={styles.title}>Add Review</Text>

//         <TextInput
//           value={productName}
//           onChangeText={setProductName}
//           placeholder="Product Name"
//           style={styles.input}
//         />
//         <TextInput
//           value={reviewText}
//           onChangeText={setReviewText}
//           placeholder="Write your review"
//           multiline
//           style={[styles.input, { height: 100 }]}
//         />
//         <TextInput
//           value={rating}
//           onChangeText={setRating}
//           placeholder="Rating (1-5)"
//           keyboardType="numeric"
//           style={styles.input}
//         />
//         <TextInput
//           value={username}
//           onChangeText={setUsername}
//           placeholder="Your Name"
//           style={styles.input}
//         />

//         <TouchableOpacity style={styles.button} onPress={pickImage}>
//           <Text style={styles.buttonText}>Pick an Image</Text>
//         </TouchableOpacity>

//         {image && (
//           <Image
//             source={{ uri: image.uri }}
//             style={styles.preview}
//           />
//         )}

//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Submit Review</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#9DCF8E',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//     color: '#2e6d3f',
//   },
//   formBox: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 4,
//   },
//   input: {
//     backgroundColor: '#f8f8f8',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   button: {
//     backgroundColor: '#3c8256',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   preview: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     marginBottom: 15,
//     borderRadius: 8,
//   },
// });





import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router'; // ✅ import router

export default function AddReview() {
  const [productName, setProductName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const router = useRouter(); // ✅ initialize router

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!productName || !reviewText || !rating || !username) {
      Alert.alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('reviewText', reviewText);
    formData.append('rating', rating);
    formData.append('username', username);

    // ✅ Append image if available
    if (image) {
      const uriParts = image.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('image', {
        uri: image.uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      const response = await fetch('http://192.168.30.11:3000/reviews', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Review added successfully');
        // ✅ Clear form
        setProductName('');
        setReviewText('');
        setRating('');
        setUsername('');
        setImage(null);

        // ✅ Navigate to GetReviews page
        router.push('/View-Review');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit review');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formBox}>
        <Text style={styles.title}>Add Review</Text>

        <TextInput
          value={productName}
          onChangeText={setProductName}
          placeholder="Product Name"
          style={styles.input}
        />
        <TextInput
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="Write your review"
          multiline
          style={[styles.input, { height: 100 }]}
        />
        <TextInput
          value={rating}
          onChangeText={setRating}
          placeholder="Rating (1-5)"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Your Name"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image.uri }}
            style={styles.preview}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DCF8E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2e6d3f',
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
  input: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#3c8256',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  preview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
