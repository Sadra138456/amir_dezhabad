import { STORAGE_KEY_IMAGE } from './constants';

class DatabaseService {
  private static instance: DatabaseService;
  
  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Save profile image to SQLite Backend
  public async saveProfileImage(imageData: string): Promise<boolean> {
    try {
      // Use relative path '/api/...'. This automatically uses the current domain/host.
      // No need to hardcode localhost or IP anymore.
      const response = await fetch(`/api/profile-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error('Server save failed');
      }

      localStorage.setItem(STORAGE_KEY_IMAGE, imageData);
      return true;

    } catch (error) {
      console.warn("Backend connection failed, falling back to LocalStorage:", error);
      localStorage.setItem(STORAGE_KEY_IMAGE, imageData);
      return false;
    }
  }

  // Retrieve profile image from SQLite Backend
  public async getProfileImage(): Promise<string | null> {
    try {
      const response = await fetch(`/api/profile-image`);
      if (response.ok) {
        const data = await response.json();
        if (data.image) {
          localStorage.setItem(STORAGE_KEY_IMAGE, data.image);
          return data.image;
        }
      }
    } catch (error) {
      console.warn("Backend connection failed, using LocalStorage cache:", error);
    }

    return localStorage.getItem(STORAGE_KEY_IMAGE);
  }

  public async clearProfileImage(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_IMAGE);
  }
}

export const db = DatabaseService.getInstance();