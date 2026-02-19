import { useState } from 'react';
import { Alert, ScrollView,  View,Text} from 'react-native';
import {
  ActionSheet,
  Button,
  showActionSheet,
} from '@skyroc/native-ui';
import type { ActionSheetAction } from '@skyroc/native-ui';

const basicActions: ActionSheetAction[] = [
  { name: 'Option 1' },
  { name: 'Option 2' },
  { name: 'Option 3' }
];

const statusActions: ActionSheetAction[] = [
  { name: 'Colored Option', color: '#ee0a24' },
  { name: 'Disabled Option', disabled: true },
  { name: 'Loading Option', loading: true }
];

const subnameActions: ActionSheetAction[] = [
  { name: 'Option 1', subname: 'Description text' },
  { name: 'Option 2', subname: 'Another description' },
  { name: 'Option 3' }
];


const ActionSheetDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showSubname, setShowSubname] = useState(false);

  function handleFunctionCall() {
    showActionSheet({
      title: 'Function Call',
      actions: basicActions,
      cancelText: 'Cancel'
    }).then(result => {
      if (result) {
        Alert.alert('Selected', result.action.name);
      }
    });
  }

  function handleFunctionAsync() {
    showActionSheet({
      title: 'Choose Action',
      description: 'Pick one to proceed',
      actions: subnameActions,
      cancelText: 'Cancel'
    }).then(result => {
      if (result) {
        Alert.alert('Selected', `${result.action.name} (index: ${result.index})`);
      } else {
        Alert.alert('Cancelled');
      }
    });
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Declarative */}
      <Text className={'mb-4 text-lg font-semibold'} >Declarative</Text>
      <View className="mb-8 gap-3">
        <Button onPress={() => setShowBasic(true)}>Basic</Button>
        <Button variant="tonal" onPress={() => setShowCancel(true)}>Cancel Button</Button>
        <Button variant="tonal" onPress={() => setShowDesc(true)}>Description</Button>
        <Button variant="tonal" onPress={() => setShowStatus(true)}>Option Status</Button>
        <Button variant="tonal" onPress={() => setShowSubname(true)}>Subname</Button>
      </View>

      {/* Function Call */}
      <Text className="mb-4 text-lg font-semibold" >Function Call</Text>
      <View className="mb-8 gap-3">
        <Button variant="outline" onPress={handleFunctionCall}>showActionSheet</Button>
        <Button variant="outline" onPress={handleFunctionAsync}>With Description</Button>
      </View>

      {/* Basic */}
      <ActionSheet
        actions={basicActions}
        show={showBasic}
        onSelect={(action) => Alert.alert('Selected', action.name)}
        onUpdateShow={setShowBasic}
      />

      {/* Cancel */}
      <ActionSheet
        actions={basicActions}
        cancelText="Cancel"
        show={showCancel}
        onSelect={(action) => Alert.alert('Selected', action.name)}
        onUpdateShow={setShowCancel}
      />

      {/* Description */}
      <ActionSheet
        actions={basicActions}
        cancelText="Cancel"
        closeOnClickAction
        description="Are you sure about this action? It cannot be undone."
        show={showDesc}
        title="Title"
        onSelect={(action) => Alert.alert('Selected', action.name)}
        onUpdateShow={setShowDesc}
      />

      {/* Status */}
      <ActionSheet
        actions={statusActions}
        cancelText="Cancel"
        show={showStatus}
        title="Option Status"
        onUpdateShow={setShowStatus}
      />

      {/* Subname */}

      <ActionSheet
        actions={subnameActions}
        cancelText="Cancel"
        closeOnClickAction
        show={showSubname}
        title="Subname"
        onSelect={(action) => Alert.alert('Selected', action.name)}
        onUpdateShow={setShowSubname}
        />

    </ScrollView>
  );
};

export { ActionSheetDemo };
