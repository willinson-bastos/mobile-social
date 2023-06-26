import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const Toast = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    show: (text) => {
      setMessage(text);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    },
  }));

  return (
    isVisible && (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 20,
          right: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Icon name="info-circle" type="font-awesome" color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 10 }}>{message}</Text>
      </View>
    )
  );
});

export default Toast;
