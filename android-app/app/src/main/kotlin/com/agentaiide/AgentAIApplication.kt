package com.agentaiide

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

/**
 * Application class for Agent AI IDE
 * Sets up dependency injection and global configurations
 */
@HiltAndroidApp
class AgentAIApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        // Initialize any required libraries or configurations
        initializeLogging()
    }
    
    private fun initializeLogging() {
        // Initialize logging for debug builds
        if (BuildConfig.DEBUG) {
            // Set up debug logging
        }
    }
}
