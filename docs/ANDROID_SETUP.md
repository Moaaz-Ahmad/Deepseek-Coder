# Agent AI IDE - Setup Instructions

## 🚀 Running on Android Virtual Device

### Prerequisites
1. **Android Studio** - Install from [developer.android.com](https://developer.android.com/studio)
2. **Android SDK** - Installed via Android Studio
3. **Java Development Kit (JDK)** - Version 11 or higher
4. **Node.js** - Version 18 or higher (for backend API)

### Environment Setup

#### 1. Android SDK Configuration
```bash
# Set environment variables (add to your system PATH)
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\emulator;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

#### 2. Create Android Virtual Device (AVD)
1. Open Android Studio
2. Go to Tools → AVD Manager
3. Click "Create Virtual Device"
4. Choose device: Pixel 7 (or similar)
5. Select API Level 34 (Android 14)
6. Name: `Pixel_7_API_34`
7. Finish setup

### Running the Application

#### 1. Start Backend API Server
```bash
cd backend
npm install
npm run build
node dist/index.js
```
Backend will run on: `http://localhost:3000`

#### 2. Start Android Emulator
```bash
# Option A: From Android Studio
# Open AVD Manager → Click Play button on your AVD

# Option B: From Command Line (if PATH is set)
emulator -avd Pixel_7_API_34
```

#### 3. Build and Install Android App
```bash
cd android-app
./gradlew assembleDebug
./gradlew installDebug
```

#### 4. Launch App
- Find "Agent AI IDE" in the emulator app drawer
- Or run: `adb shell am start -n com.agentaiide/.MainActivity`

### VS Code Integration

#### Available Tasks (Ctrl+Shift+P → "Tasks: Run Task")
- **Start Android Emulator** - Launches the emulator
- **Build Android App** - Compiles the APK
- **Install Android App** - Installs app on connected device/emulator
- **Run Android App** - Full build, install, and launch sequence
- **Start Backend Only** - Runs the API server

#### Extensions Installed
- Android debugging support
- Kotlin Language Support  
- Android iOS Emulator

### Development Workflow

1. **Start Backend**: Use "Start Backend Only" task
2. **Start Emulator**: Use "Start Android Emulator" task
3. **Build & Install**: Use "Run Android App" task
4. **Test**: Open app in emulator

### API Configuration

The Android app is configured to connect to:
- Development: `http://10.0.2.2:3000` (emulator localhost)
- Production: Update `API_BASE_URL` in `android-app/app/build.gradle.kts`

### Troubleshooting

#### Backend Issues
- Ensure Node.js is installed
- Run `npm install` in backend directory
- Check that port 3000 is available
- Verify `.env` file exists with proper configuration

#### Android Issues
- Verify Android SDK is installed
- Check that emulator is running
- Ensure ADB can detect device: `adb devices`
- Clean build if needed: `./gradlew clean`

#### Network Issues
- Android emulator uses `10.0.2.2` to access host machine's localhost
- Ensure backend is running on `0.0.0.0:3000` not just `127.0.0.1:3000`
- Check firewall settings

### Current Status

✅ **Backend API**: Ready with mock Deepseek integration
✅ **Android Project**: Created with Jetpack Compose UI
✅ **Navigation**: Multi-screen app structure
✅ **Development Tasks**: VS Code integration configured
⏳ **API Integration**: Backend needs to be running
⏳ **Real Deepseek API**: Requires API key configuration

### Next Steps

1. Set up Android development environment
2. Start backend server
3. Launch Android emulator
4. Build and test the app
5. Configure Deepseek API key for full functionality

For detailed setup help, see the individual README files in each component directory.
