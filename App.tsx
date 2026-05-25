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
  Modal,
  Switch,
  Linking,
} from 'react-native';

const ULKATV_PACKAGE = 'com.ulkatech.ulkasports';

const FOCUS_IDS = {
  home: 101,
  livetv: 102,
  apps: 103,
  games: 104,
  add1: 201,
  add2: 202,
  quickApp1: 301,
  quickApp2: 302,
  quickApp3: 303,
  quickApp4: 304,
  settingsClose: 401,
};

type FocusKey = keyof typeof FOCUS_IDS;

const App = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [focusedMenuId, setFocusedMenuId] = useState<FocusKey | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const homeRef = useRef<any>(null);
  const livetvRef = useRef<any>(null);
  const appsRef = useRef<any>(null);
  const gamesRef = useRef<any>(null);
  const add1Ref = useRef<any>(null);
  const add2Ref = useRef<any>(null);
  const quickApp1Ref = useRef<any>(null);
  const quickApp2Ref = useRef<any>(null);
  const quickApp3Ref = useRef<any>(null);
  const quickApp4Ref = useRef<any>(null);
  const closeButtonRef = useRef<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // డిఫాల్ట్ ఫోకస్ హోమ్ బటన్ పై పెట్టు
  useEffect(() => {
    if (!focusedMenuId) {
      setFocusedMenuId('home');
      setTimeout(() => {
        homeRef.current?.focus();
        console.log('Focus set to Home');
      }, 100);
    }
  }, [focusedMenuId]);

  const launchULKATV = async () => {
    try {
      await Linking.openURL(`intent://#Intent;package=${ULKATV_PACKAGE};scheme=;end`);
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
      case 'add1':
        Alert.alert('Advertisement 1', 'Ad 1 clicked');
        break;
      case 'add2':
        Alert.alert('Advertisement 2', 'Ad 2 clicked');
        break;
      default:
        Alert.alert('Navigation', `${id} pressed`);
    }
  };

  const quickApps = [
    { id: 'quickApp1', name: 'Settings', image: require('./assets/images/Settings.png'), ref: quickApp1Ref },
    { id: 'quickApp2', name: 'Web Page', image: require('./assets/images/web-page.png'), ref: quickApp2Ref },
    { id: 'quickApp3', name: 'YouTube', image: require('./assets/images/youtube.png'), ref: quickApp3Ref },
    { id: 'quickApp4', name: 'Games', image: require('./assets/images/game-folder1.png'), ref: quickApp4Ref },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <View style={styles.leftTopRow}>
              <Image source={require('./assets/images/Apfiber_logo.png')} style={styles.logoImage} resizeMode="contain" />
              <Text style={styles.tempCity}>32°C Hyderabad</Text>
            </View>
            <View style={styles.rightTop}>
              <Text style={styles.time}>{currentTime}</Text>
            </View>
          </View>

          <View style={styles.twoColumn}>
            {/* LEFT COLUMN */}
            <View style={styles.leftNav}>
              <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search', 'Search pressed')}>
                <Image source={require('./assets/images/search-symbol.png')} style={styles.searchIcon} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                ref={homeRef}
                style={[styles.iconButton, focusedMenuId === 'home' && styles.focusedIconButton]}
                onPress={() => handlePress('home')}
                onFocus={() => setFocusedMenuId('home')}
                hasTVPreferredFocus={true}
                nextFocusDown={FOCUS_IDS.livetv}
                nextFocusRight={FOCUS_IDS.add1}
                activeOpacity={1}
              >
                <Image source={require('./assets/images/home.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <TouchableOpacity
                ref={livetvRef}
                style={[styles.iconButton, focusedMenuId === 'livetv' && styles.focusedIconButton]}
                onPress={() => handlePress('livetv')}
                onFocus={() => setFocusedMenuId('livetv')}
                nextFocusUp={FOCUS_IDS.home}
                nextFocusDown={FOCUS_IDS.apps}
                nextFocusRight={FOCUS_IDS.add2}
                activeOpacity={1}
              >
                <Image source={require('./assets/images/TVShow.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <TouchableOpacity
                ref={appsRef}
                style={[styles.iconButton, focusedMenuId === 'apps' && styles.focusedIconButton]}
                onPress={() => handlePress('apps')}
                onFocus={() => setFocusedMenuId('apps')}
                nextFocusUp={FOCUS_IDS.livetv}
                nextFocusDown={FOCUS_IDS.games}
                nextFocusRight={FOCUS_IDS.quickApp1}
                activeOpacity={1}
              >
                <Image source={require('./assets/images/Apps.png')} style={styles.iconImage} />
              </TouchableOpacity>

              <TouchableOpacity
                ref={gamesRef}
                style={[styles.iconButton, focusedMenuId === 'games' && styles.focusedIconButton]}
                onPress={() => handlePress('games')}
                onFocus={() => setFocusedMenuId('games')}
                nextFocusUp={FOCUS_IDS.apps}
                nextFocusLeft={FOCUS_IDS.quickApp4}
                nextFocusRight={FOCUS_IDS.quickApp3}
                activeOpacity={1}
              >
                <Image source={require('./assets/images/game-folder1.png')} style={styles.iconImage} />
              </TouchableOpacity>
            </View>

            {/* RIGHT COLUMN */}
            <View style={styles.rightContent}>
              <View style={styles.adsRow}>
                <TouchableOpacity
                  ref={add1Ref}
                  style={[styles.adItem, styles.redBorder, focusedMenuId === 'add1' && styles.focusedAd]}
                  onPress={() => handlePress('add1')}
                  onFocus={() => setFocusedMenuId('add1')}
                  nextFocusUp={FOCUS_IDS.home}
                  nextFocusDown={FOCUS_IDS.quickApp1}
                  nextFocusLeft={FOCUS_IDS.home}
                  nextFocusRight={FOCUS_IDS.add2}
                  activeOpacity={1}
                >
                  <Image source={require('./assets/images/add1.png')} style={styles.adImage} />
                </TouchableOpacity>

                <TouchableOpacity
                  ref={add2Ref}
                  style={[styles.adItem, styles.redBorder, focusedMenuId === 'add2' && styles.focusedAd]}
                  onPress={() => handlePress('add2')}
                  onFocus={() => setFocusedMenuId('add2')}
                  nextFocusUp={FOCUS_IDS.livetv}
                  nextFocusDown={FOCUS_IDS.quickApp2}
                  nextFocusLeft={FOCUS_IDS.add1}
                  nextFocusRight={FOCUS_IDS.quickApp3}
                  activeOpacity={1}
                >
                  <Image source={require('./assets/images/add2.png')} style={styles.adImage} />
                </TouchableOpacity>
              </View>

              <View style={styles.quickAppsRow}>
                <View style={[styles.borderedColumnRed, styles.leftColumn]}>
                  <Image source={require('./assets/images/goverenment1.png')} style={styles.fullSizeImage} resizeMode="cover" />
                </View>

                <View style={[styles.borderedColumnRed, styles.middleColumn]}>
                  <Text style={styles.quickAppsTitle}>QUICK APPS</Text>
                  <View style={styles.appsRowNoBorder}>
                    {quickApps.map((app, index) => (
                      <TouchableOpacity
                        key={app.id}
                        ref={app.ref}
                        style={[styles.appItemNoBorder, focusedMenuId === app.id && styles.focusedAppNoBorder]}
                        onPress={() => handlePress(app.id as FocusKey)}
                        onFocus={() => setFocusedMenuId(app.id as FocusKey)}
                        nextFocusLeft={index === 0 ? FOCUS_IDS.add1 : index === 1 ? FOCUS_IDS.quickApp1 : index === 2 ? FOCUS_IDS.quickApp2 : index === 3 ? FOCUS_IDS.quickApp3 : undefined}
                        nextFocusRight={index === 0 ? FOCUS_IDS.quickApp2 : index === 1 ? FOCUS_IDS.quickApp3 : index === 2 ? FOCUS_IDS.quickApp4 : index === 3 ? FOCUS_IDS.games : undefined}
                        nextFocusUp={index === 0 ? FOCUS_IDS.add1 : index === 1 ? FOCUS_IDS.add2 : index === 2 ? FOCUS_IDS.add2 : index === 3 ? FOCUS_IDS.games : undefined}
                        nextFocusDown={index === 3 ? FOCUS_IDS.games : undefined}
                        activeOpacity={1}
                      >
                        <Image source={app.image} style={styles.appIconNoBorder} />
                        <Text style={styles.appNameNoBorder}>{app.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={[styles.borderedColumnRed, styles.rightColumn]}>
                  <Image source={require('./assets/images/goverenment2.png')} style={styles.fullSizeImage} resizeMode="cover" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Settings Modal */}
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
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notificationEnabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Play</Text>
              <Switch
                value={autoPlayEnabled}
                onValueChange={setAutoPlayEnabled}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={autoPlayEnabled ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>

            <TouchableOpacity
              ref={closeButtonRef}
              style={[styles.closeButton, focusedMenuId === 'settingsClose' && styles.focusedCloseButton]}
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leftTopRow: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 200, height: 60, marginLeft: 60, marginRight: 12 },
  tempCity: { fontSize: 16, color: '#f46004', marginTop: '6%' },
  rightTop: { justifyContent: 'center' },
  time: { fontSize: 16, fontWeight: '600', color: '#2c3e50' },
  twoColumn: { flexDirection: 'row', padding: 12, flex: 1 },
  leftNav: { width: 'auto', marginRight: 8, alignItems: 'center' },
  searchButton: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: '#ddd',
  },
  searchIcon: { width: 30, height: 30 },
  iconButton: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    borderWidth: 2, borderColor: '#ddd',
  },
  // స్పష్టంగా కనిపించే ఫోకస్ ఎఫెక్ట్
  focusedIconButton: {
    backgroundColor: '#000000',   // నలుపు నేపథ్యం
    borderColor: '#FFD700',      // బంగారు అంచు
    borderWidth: 6,
    transform: [{ scale: 1.15 }],
    shadowColor: '#FFD700',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 15,
  },
  iconImage: { width: 35, height: 35, resizeMode: 'contain' },
  rightContent: { flex: 1, marginLeft: 4 },
  adsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  adItem: {
    width: '49%',
    height: 280,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: '#FF0000',
  },
  redBorder: { borderColor: '#FF0000' },
  focusedAd: {
    borderColor: '#FFD700',
    borderWidth: 6,
    backgroundColor: '#000000',
    transform: [{ scale: 1.02 }],
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  adImage: {
    width: '100%',
    height: '104%',
    resizeMode: 'cover',
  },
  quickAppsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 2,
  },
  borderedColumnRed: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 8,
    marginHorizontal: 2,
    padding: 0,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leftColumn: { flex: 0.8 },
  middleColumn: { flex: 2.0 },
  rightColumn: { flex: 0.8 },
  fullSizeImage: {
    width: '102%',
    height: '100%',
    resizeMode: 'cover',
  },
  quickAppsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 4,
  },
  appsRowNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  appItemNoBorder: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
    marginHorizontal: 2,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  focusedAppNoBorder: {
    backgroundColor: '#000000',
    borderWidth: 6,
    borderColor: '#FFD700',
    transform: [{ scale: 1.15 }],
    shadowColor: '#FFD700',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 15,
  },
  appIconNoBorder: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#f1f2f6',
  },
  appNameNoBorder: {
    fontSize: 10,
    color: '#34495e',
    marginTop: 2,
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    backgroundColor: '#000000',
    borderWidth: 4,
    borderColor: '#FFD700',
    transform: [{ scale: 1.05 }],
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
