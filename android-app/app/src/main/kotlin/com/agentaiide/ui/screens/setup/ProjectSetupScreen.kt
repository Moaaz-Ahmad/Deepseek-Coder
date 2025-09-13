package com.agentaiide.ui.screens.setup

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Project Setup screen - guided project creation wizard
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProjectSetupScreen(
    onNavigateBack: () -> Unit,
    onProjectCreated: (String) -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize()
    ) {
        TopAppBar(
            title = { Text("New Project") },
            navigationIcon = {
                IconButton(onClick = onNavigateBack) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
            }
        )
        
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Project Setup Wizard",
                    style = MaterialTheme.typography.headlineMedium
                )
                Text(
                    text = "AI-guided Android project creation",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = 8.dp)
                )
                
                Button(
                    onClick = { onProjectCreated("demo-project-1") },
                    modifier = Modifier.padding(top = 16.dp)
                ) {
                    Text("Create Demo Project")
                }
            }
        }
    }
}
