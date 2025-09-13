package com.agentaiide

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.agentaiide.ui.navigation.AgentAINavigation
import com.agentaiide.ui.theme.AgentAIIDETheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Main activity for Agent AI IDE
 * Entry point for the application with navigation setup
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        
        setContent {
            AgentAIIDETheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    AgentAINavigation(
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}
