import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface ScrollableModalProps {
  isVisible: boolean;
  onClose: Function;
  contentHeight: number;
}
const scrollViewHeight = Dimensions.get('window').height * 0.7;

export const ScrollableModal: React.FC<ScrollableModalProps> = ({ isVisible, children, onClose, contentHeight }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState<number>();


  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      testID={'modal'}
      onBackdropPress={() => onClose()}
      isVisible={isVisible}
      onSwipeComplete={() => onClose()}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={contentHeight - scrollViewHeight} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.modal}
    >
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: scrollViewHeight,
  }
});
