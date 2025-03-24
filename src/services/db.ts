// Temporary in-memory storage
const userProgress = new Map<string, any>();
const puzzleProgress = new Map<string, any>();

export const connectToDatabase = async () => {
  console.log('Using in-memory storage');
  return true;
};

export const getUserProgress = async (userId: string) => {
  return userProgress.get(userId) || null;
};

export const saveUserProgress = async (userId: string, data: any) => {
  userProgress.set(userId, { ...userProgress.get(userId), ...data });
  return true;
};

export const updatePuzzleProgress = async (userId: string, puzzleId: string, solved: boolean, timeSpent: number) => {
  const key = `${userId}-${puzzleId}`;
  puzzleProgress.set(key, {
    solved,
    timeSpent,
    updatedAt: new Date()
  });
  return true;
}; 