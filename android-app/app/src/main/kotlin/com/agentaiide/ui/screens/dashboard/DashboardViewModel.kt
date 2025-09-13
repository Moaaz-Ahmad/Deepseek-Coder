package com.agentaiide.ui.screens.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * ViewModel for Dashboard screen
 * Manages dashboard state and recent projects
 */
@HiltViewModel
class DashboardViewModel @Inject constructor(
    // TODO: Inject project repository when implemented
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(DashboardUiState())
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()
    
    init {
        loadRecentProjects()
    }
    
    private fun loadRecentProjects() {
        viewModelScope.launch {
            // TODO: Load recent projects from repository
            // For now, use mock data
            _uiState.value = _uiState.value.copy(
                recentProjects = listOf(
                    // Empty list for now - will be populated when project management is implemented
                )
            )
        }
    }
}

/**
 * UI State for Dashboard screen
 */
data class DashboardUiState(
    val recentProjects: List<RecentProject> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

/**
 * Data class representing a recent project
 */
data class RecentProject(
    val id: String,
    val name: String,
    val path: String,
    val lastModified: String,
    val type: String = "Android"
)
