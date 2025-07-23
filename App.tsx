import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:5000'; 

export default function App() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // customers loading 
  useEffect(() => {
    axios
      .get(`${API_URL}/customers`)
      .then((res) => setCustomers(res.data))
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Failed to load customers.');
      });
  }, []);

  //  Payment Submission
  const handlePayment = () => {
    if (!accountNumber || !paymentAmount) {
      Alert.alert('Error', 'Please enter account number and amount.');
      return;
    }

    axios
      .post(`${API_URL}/payments`, {
        account_number: accountNumber,
        payment_amount: parseFloat(paymentAmount),
      })
      .then(() => {
        setPaymentSuccess(true);
        fetchPayments(accountNumber);
      })
      .catch(() => Alert.alert('Error', 'Failed to record payment.'));
  };

  // Fetch payment history
  const fetchPayments = (accNumber: string) => {
    axios
      .get(`${API_URL}/payments/${accNumber}`)
      .then((res) => setPayments(res.data))
      .catch(() => Alert.alert('Error', 'Failed to fetch payments.'));
  };


  const resetPayment = () => {
    setPaymentSuccess(false);
    setPaymentAmount('');
  };

  // payment success  confiramtion 
  if (paymentSuccess) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successText}> Payment Successful!</Text>
        <Text>Account: {accountNumber}</Text>
        <Text>Amount: ₹{paymentAmount}</Text>
        <Text>Date: {new Date().toDateString()}</Text>
        <Button title="Back to Home" onPress={resetPayment} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Customers */}
      <Text style={styles.heading}>Customers</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.account_number}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>Account: {item.account_number}</Text>
            <Text>Issue Date: {item.issue_date}</Text>
            <Text>Interest: {item.interest_rate}%</Text>
            <Text>Tenure: {item.tenure} months</Text>
            <Text>EMI Due: ₹{item.emi_due}</Text>
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() => setAccountNumber(item.account_number)}
            >
              <Text style={styles.btnText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/*  Form for payment  */}
      <Text style={styles.heading}>Make Payment</Text>
      <TextInput
        placeholder="Account Number"
        style={styles.input}
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        placeholder="Payment Amount"
        style={styles.input}
        keyboardType="numeric"
        value={paymentAmount}
        onChangeText={setPaymentAmount}
      />
      <Button title="Submit Payment" onPress={handlePayment} />

      {/* History of payment details */}
      <Text style={styles.heading}>Payment History</Text>
      <Button
        title="Fetch Payment History"
        onPress={() => fetchPayments(accountNumber)}
      />
      {payments.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text>Amount: ₹{p.payment_amount}</Text>
          <Text>Date: {new Date(p.payment_date).toDateString()}</Text>
          <Text>Status: {p.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9' },
  heading: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  selectBtn: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8ffe8',
  },
  successText: { fontSize: 22, fontWeight: 'bold', color: 'green', marginBottom: 10 },
});
