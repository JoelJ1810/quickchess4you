const API_URL = 'http://localhost:5000/api';

interface UserData {
  name: string;
  phoneNumber: string;
  puzzleProgress: Array<{
    puzzleId: number;
    timeSpent: number;
    completed: boolean;
    completedAt?: Date;
  }>;
  totalTimeSpent: number;
  totalPuzzlesCompleted: number;
  progressPercentage: number;
}

export async function saveUserProgress(userData: UserData): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save user data');
    }

    const data = await response.json();
    return data._id;
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
}

export async function updatePuzzleProgress(
  userId: string,
  puzzleId: number,
  timeSpent: number,
  completed: boolean
): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        puzzleId,
        timeSpent,
        completed
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update puzzle progress');
    }

    return true;
  } catch (error) {
    console.error('Error updating puzzle progress:', error);
    throw error;
  }
}

export async function getUserProgress(userId: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch user progress');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
} 