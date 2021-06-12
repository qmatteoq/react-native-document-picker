import * as React from 'react'

import { StyleSheet, View, Text, Button } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

export default function App() {
  const [result, setResult] = React.useState<number | undefined>()

  return (
    <View style={styles.container}>
      <Button
        title="open picker"
        onPress={() => {
          DocumentPicker.pick({}).then(setResult)
        }}
      />
      <Text>Result: {result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
})
