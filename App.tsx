import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Pressable,
  Modal,
  Switch,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ULKATV_PACKAGE = 'com.ulkatech.ulkasports';

type FocusKey =
  | 'home'
  | 'livetv'
  | 'apps'
  | 'games'
  | 'watchNow'
  | 'quickApp1'
  | 'quickApp2'
  | 'quickApp3'
  | 'quickApp4'
  | 'settingsClose';

const FocusBox = ({
  id,
  focusedMenuId,
  setFocusedMenuId,
  onPress,
  children,
  style,
  focusedStyle,
  boxRef,
  hasTVPreferredFocus = false,
}: any) => {
  const isFocused = focusedMenuId === id;

  return (
    <Pressable
      ref={boxRef}
      focusable={true}
      hasTVPreferredFocus={hasTVPreferredFocus}
      onFocus={() => setFocusedMenuId(id)}
      onPress={onPress}
      style={[style, isFocused && focusedStyle]}
    >
      {children}
    </Pressable>
  );
};

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [focusedMenuId, setFocusedMenuId] = useState<FocusKey | null>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const homeRef = useRef<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      homeRef.current?.focus?.();
    }, 500);
  }, []);

  const launchULKATV = async () => {
    try {
      await Linking.openURL(
        `intent://#Intent;package=${ULKATV_PACKAGE};scheme=;end`,
      );
    } catch (error) {
      Alert.alert('Error', 'Cannot open ULKATV app');
    }
  };

  const handlePress = (id: FocusKey) => {
    switch (id) {
      case 'livetv':
        launchULKATV();
        break;
      case 'quickApp1':
        setShowSettings(true);
        break;
      case 'quickApp2':
        Alert.alert('Web Page', 'Browser will open.');
        break;
      case 'quickApp3':
        Alert.alert('YouTube', 'YouTube app will open.');
        break;
      case 'quickApp4':
        Alert.alert('Games', 'Games folder will open.');
        break;
      default:
        Alert.alert('Navigation', `${id} pressed`);
    }
  };

  const quickApps = [
    {
      id: 'quickApp1' as FocusKey,
      name: 'Settings',
      iconType: 'Ionicons',
      iconName: 'settings',
    },
    {
      id: 'quickApp2' as FocusKey,
      name: 'Web Page',
      iconType: 'MaterialIcons',
      iconName: 'language',
    },
    {
      id: 'quickApp3' as FocusKey,
      name: 'YouTube',
      iconType: 'FontAwesome',
      iconName: 'youtube-play',
    },
    {
      id: 'quickApp4' as FocusKey,
      name: 'Games',
      iconType: 'Ionicons',
      iconName: 'game-controller',
    },
  ];

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Image
                source={require('./assets/images/Apfiber_logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.tempCity}>32°C Hyderabad</Text>
            </View>

            <View style={styles.rightTop}>
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </View>

          <View style={styles.twoColumn}>
            <View style={styles.leftNav}>
             <FocusBox
                id="home"
                boxRef={homeRef}
                hasTVPreferredFocus={true}
                focusedMenuId={focusedMenuId}
                setFocusedMenuId={setFocusedMenuId}
                onPress={() => handlePress('home')}
                style={styles.iconButton}
                focusedStyle={styles.focusedIconButton}
              >
                <MaterialIcons
                  name="home"
                  size={34}
                  color={focusedMenuId === 'home' ? '#ffffff' : '#F15A24'}
                />
             </FocusBox>

              <FocusBox
                id="livetv"
                focusedMenuId={focusedMenuId}
                setFocusedMenuId={setFocusedMenuId}
                onPress={() => handlePress('livetv')}
                style={styles.iconButton}
                focusedStyle={styles.focusedIconButton}
              >
                <Ionicons
                  name="tv"
                  size={34}
                  color={focusedMenuId === 'livetv' ? '#ffffff' : '#F15A24'}
                />
              </FocusBox>

              <FocusBox
                id="apps"
                focusedMenuId={focusedMenuId}
                setFocusedMenuId={setFocusedMenuId}
                onPress={() => handlePress('apps')}
                style={styles.iconButton}
                focusedStyle={styles.focusedIconButton}
              >
                <MaterialIcons
                  name="apps"
                  size={34}
                  color={focusedMenuId === 'apps' ? '#ffffff' : '#F15A24'}
                />
              </FocusBox>

              <FocusBox
                id="games"
                focusedMenuId={focusedMenuId}
                setFocusedMenuId={setFocusedMenuId}
                onPress={() => handlePress('games')}
                style={styles.iconButton}
                focusedStyle={styles.focusedIconButton}
              >
                <Ionicons
                  name="game-controller"
                  size={34}
                  color={focusedMenuId === 'games' ? '#ffffff' : '#F15A24'}
                />
              </FocusBox>
            </View>

            <View style={styles.rightContent}>
              <View style={styles.adsRow}>
                <View style={styles.adItem}>
                  <Image
                    source={require('./assets/images/add1.png')}
                    style={styles.adImage}
                    resizeMode="cover"
                  />

                  <FocusBox
                    id="watchNow"
                    focusedMenuId={focusedMenuId}
                    setFocusedMenuId={setFocusedMenuId}
                    onPress={() => handlePress('livetv')}
                    style={styles.watchNowButton}
                    focusedStyle={styles.focusedWatchNowButton}
                  >
                    <Text style={styles.watchNowText}>Watch Now</Text>
                  </FocusBox>
                </View>

                <View style={styles.adItem}>
                  <Image
                    source={require('./assets/images/add2.png')}
                    style={styles.adImage}
                    resizeMode="cover"
                  />
                </View>
              </View>

              <View style={styles.quickAppsRow}>
                <View style={[styles.bottomImageCard, styles.leftColumn]}>
                  <Image
                    source={require('./assets/images/add3.png')}
                    style={styles.bottomImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={[styles.quickAppsCard, styles.middleColumn]}>
                  <Text style={styles.quickAppsTitle}>QUICK APPS</Text>

                  <View style={styles.appsRowNoBorder}>
                    {quickApps.map(app => (
                      <FocusBox
                        key={app.id}
                        id={app.id}
                        focusedMenuId={focusedMenuId}
                        setFocusedMenuId={setFocusedMenuId}
                        onPress={() => handlePress(app.id)}
                        style={styles.appItemNoBorder}
                        focusedStyle={styles.focusedAppNoBorder}
                      >
                        {app.iconType === 'Ionicons' && (
                          <Ionicons
                            name={app.iconName}
                            size={42}
                            color={focusedMenuId === app.id ? '#F15A24' : '#FF7A1A'}
                          />
                        )}

                        {app.iconType === 'MaterialIcons' && (
                          <MaterialIcons
                            name={app.iconName}
                            size={42}
                            color={focusedMenuId === app.id ? '#F15A24' : '#2196F3'}
                          />
                        )}

                        {app.iconType === 'FontAwesome' && (
                          <FontAwesome
                            name={app.iconName}
                            size={42}
                            color="#FF0000"
                          />
                        )}

                        <Text
                          style={[
                            styles.appNameNoBorder,
                            focusedMenuId === app.id && styles.focusedAppName,
                          ]}
                        >
                          {app.name}
                        </Text>
                      </FocusBox>
                    ))}
                  </View>
                </View>

                <View style={[styles.bottomImageCard, styles.rightColumn]}>
                  <Image
                    source={require('./assets/images/add4.png')}
                    style={styles.bottomImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Settings</Text>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Switch
                value={notificationEnabled}
                onValueChange={setNotificationEnabled}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Play</Text>
              <Switch
                value={autoPlayEnabled}
                onValueChange={setAutoPlayEnabled}
              />
            </View>

            <TouchableOpacity
              focusable={true}
              style={[
                styles.closeButton,
                focusedMenuId === 'settingsClose' && styles.focusedCloseButton,
              ]}
              onPress={() => setShowSettings(false)}
              onFocus={() => setFocusedMenuId('settingsClose')}
              activeOpacity={1}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  leftTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoImage: {
    width: 200,
    height: 60,
    marginLeft: 60,
    marginRight: 12,
  },

  tempCity: {
    fontSize: 16,
    color: '#f46004',
    marginTop: '6%',
  },

  rightTop: {
    justifyContent: 'center',
  },

  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },

  twoColumn: {
    flexDirection: 'row',
    padding: 12,
    flex: 1,
  },

  leftNav: {
    width: 72,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 0,
  },

  iconButton: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 0,
  },

 focusedIconButton: {
   backgroundColor: '#F15A24',
   borderRadius: 18,

   borderWidth: 4,
   borderColor: '#7FE7FF',

   transform: [{ scale: 1.08 }],
 },

  iconImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  watchNowButton: {
      position: 'absolute',
      left: 24,
      bottom: 18,
      backgroundColor: '#FF5A1F',
      paddingHorizontal: 22,
      paddingVertical: 10,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: '#ffffff',
      zIndex: 10,
      elevation: 10,
  },

  focusedWatchNowButton: {
      backgroundColor: '#00AEEF',
      borderColor: '#ffffff',
      borderWidth: 3,
      transform: [{ scale: 1.08 }],
  },

  watchNowText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '800',
  },

  rightContent: {
    flex: 1,
    marginLeft: 4,
  },

  adsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  adItem: {
    width: '49%',
    height: 280,
    backgroundColor: 'transparent',
    borderRadius: 18,
    overflow: 'hidden',

    elevation: 4,
  },

  adImage: {
    width: '100%',
    height: '100%',
  },

  quickAppsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 8,
  },

    bottomImageCard: {
      height: 140,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },

    bottomImage: {
      width: '100%',
      height: '100%',
    },

    quickAppsCard: {
      height: 126,
      borderRadius: 18,
      backgroundColor: '#F5F7FA',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    appItemNoBorder: {
      width: 82,
      height: 82,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderRadius: 14,
    },

    appNameNoBorder: {
      fontSize: 10,
      color: '#5C6470',
      marginTop: 6,
      textAlign: 'center',
    },

  borderedColumnRed: {
    borderRadius: 16,
    marginHorizontal: 4,
    height: 140,
    overflow: 'hidden',
  },

  leftColumn: {
    flex: 0.8,
    marginRight: 6,
  },

  middleColumn: {
    flex: 2,
    marginHorizontal: 6,
  },

  rightColumn: {
    flex: 0.8,
    marginLeft: 6,
  },

  fullSizeImage: {
    width: '100%',
    height: '100%',
  },

  quickAppsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },

  appsRowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },

  focusedAppNoBorder: {
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#F15A24',
    transform: [{ scale: 1.08 }],
  },

  appIconNoBorder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f1f2f6',
  },

  focusedAppName: {
    color: '#F15A24',
    fontWeight: '800',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '80%',
    elevation: 5,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  settingLabel: {
    fontSize: 18,
    color: '#333',
  },

  closeButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
  },

  focusedCloseButton: {
    backgroundColor: '#FFF200',
    borderWidth: 5,
    borderColor: '#FF0000',
    transform: [{ scale: 1.05 }],
  },

  closeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
