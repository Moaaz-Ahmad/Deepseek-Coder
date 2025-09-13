package com.agentaiide.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.agentaiide.ui.screens.dashboard.DashboardScreen
import com.agentaiide.ui.screens.editor.CodeEditorScreen
import com.agentaiide.ui.screens.projects.ProjectsScreen
import com.agentaiide.ui.screens.setup.ProjectSetupScreen

/**
 * Navigation component for Agent AI IDE
 * Handles navigation between different screens
 */
@Composable
fun AgentAINavigation(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = "dashboard",
        modifier = modifier
    ) {
        composable("dashboard") {
            DashboardScreen(
                onNavigateToProjects = { navController.navigate("projects") },
                onNavigateToEditor = { navController.navigate("editor") },
                onNavigateToSetup = { navController.navigate("setup") }
            )
        }
        
        composable("projects") {
            ProjectsScreen(
                onNavigateBack = { navController.popBackStack() },
                onNavigateToEditor = { projectId ->
                    navController.navigate("editor/$projectId")
                }
            )
        }
        
        composable("editor/{projectId}") { backStackEntry ->
            val projectId = backStackEntry.arguments?.getString("projectId")
            CodeEditorScreen(
                projectId = projectId,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        
        composable("editor") {
            CodeEditorScreen(
                projectId = null,
                onNavigateBack = { navController.popBackStack() }
            )
        }
        
        composable("setup") {
            ProjectSetupScreen(
                onNavigateBack = { navController.popBackStack() },
                onProjectCreated = { projectId ->
                    navController.navigate("editor/$projectId") {
                        popUpTo("dashboard")
                    }
                }
            )
        }
    }
}
