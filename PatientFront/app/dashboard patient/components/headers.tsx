import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname } from 'expo-router';

export default function Headers() {
    const [name, setName] = useState<string | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
           