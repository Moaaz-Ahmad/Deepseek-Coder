import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { createLogger } from '../config/logger.js';

const router = Router();
const logger = createLogger();

// Project creation schema
const projectSchema = z.object({
  name: z.string().min(1).max(100),
  packageName: z.string().min(1).max(200),
  targetSdk: z.number().min(21).max(34).default(34),
  projectType: z.enum(['basic', 'mvvm', 'compose']).default('basic'),
  features: z.array(z.string()).default([])
});

// Create new Android project
router.post('/create', async (req: Request, res: Response) => {
  try {
    const projectData = projectSchema.parse(req.body);
    
    logger.info(`Creating new project: ${projectData.name}`);
    
    // Generate project structure
    const projectStructure = generateProjectStructure(projectData);
    
    res.json({
      success: true,
      data: {
        structure: projectStructure,
        files: generateInitialFiles(projectData),
        instructions: generateSetupInstructions(projectData)
      }
    });
  } catch (error: unknown) {
    logger.error('Project creation failed:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Project creation failed'
      });
    }
  }
});

// Get project templates
router.get('/templates', (_req: Request, res: Response) => {
  const templates = [
    {
      id: 'basic',
      name: 'Basic Android App',
      description: 'A simple Android app with basic activity and layout',
      difficulty: 'beginner',
      features: ['Single Activity', 'Basic UI', 'Simple Navigation']
    },
    {
      id: 'mvvm',
      name: 'MVVM Architecture',
      description: 'Android app following MVVM pattern with ViewModel and LiveData',
      difficulty: 'intermediate',
      features: ['MVVM Pattern', 'ViewModel', 'LiveData', 'Data Binding']
    },
    {
      id: 'compose',
      name: 'Jetpack Compose',
      description: 'Modern Android UI with Jetpack Compose',
      difficulty: 'intermediate',
      features: ['Jetpack Compose', 'Modern UI', 'State Management']
    }
  ];
  
  res.json({
    success: true,
    data: templates
  });
});

// Validate project name
router.post('/validate-name', (req: Request, res: Response) => {
  const { name, packageName } = req.body;
  
  const validation = {
    name: validateProjectName(name),
    packageName: validatePackageName(packageName)
  };
  
  res.json({
    success: true,
    data: validation
  });
});

function generateProjectStructure(projectData: any) {
  const baseStructure = {
    'app/src/main/java': `${projectData.packageName.replace(/\./g, '/')}`,
    'app/src/main/res/layout': [],
    'app/src/main/res/values': [],
    'app/src/main/res/drawable': [],
    'app/src/main/res/mipmap': [],
    'app/src/test/java': `${projectData.packageName.replace(/\./g, '/')}`,
    'app/src/androidTest/java': `${projectData.packageName.replace(/\./g, '/')}`
  };
  
  return baseStructure;
}

function generateInitialFiles(projectData: any) {
  const files = [
    {
      path: 'app/build.gradle',
      content: generateBuildGradle(projectData)
    },
    {
      path: 'app/src/main/AndroidManifest.xml',
      content: generateManifest(projectData)
    },
    {
      path: `app/src/main/java/${projectData.packageName.replace(/\./g, '/')}/MainActivity.kt`,
      content: generateMainActivity(projectData)
    },
    {
      path: 'app/src/main/res/layout/activity_main.xml',
      content: generateMainLayout(projectData)
    }
  ];
  
  return files;
}

function generateSetupInstructions(_projectData: any) {
  return [
    'Open Android Studio',
    'Import the generated project',
    'Sync Gradle files',
    'Run the app on an emulator or device'
  ];
}

function validateProjectName(name: string) {
  if (!name || name.length === 0) {
    return { valid: false, error: 'Project name is required' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Project name is too long' };
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_\s]*$/.test(name)) {
    return { valid: false, error: 'Project name contains invalid characters' };
  }
  return { valid: true };
}

function validatePackageName(packageName: string) {
  if (!packageName || packageName.length === 0) {
    return { valid: false, error: 'Package name is required' };
  }
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(packageName)) {
    return { valid: false, error: 'Invalid package name format' };
  }
  return { valid: true };
}

function generateBuildGradle(projectData: any): string {
  return `plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace '${projectData.packageName}'
    compileSdk ${projectData.targetSdk}

    defaultConfig {
        applicationId "${projectData.packageName}"
        minSdk 21
        targetSdk ${projectData.targetSdk}
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`;
}

function generateManifest(projectData: any): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.${projectData.name.replace(/\s+/g, '')}"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`;
}

function generateMainActivity(projectData: any): string {
  return `package ${projectData.packageName}

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}`;
}

function generateMainLayout(projectData: any): string {
  return `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello ${projectData.name}!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`;
}

export { router as projectRoutes };
