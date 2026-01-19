/**
 * Service API pour communiquer avec le backend FEFFS
 * PÔLE: ARCHITECTURE & DONNÉES
 */

import {
    ApiResponse,
    Event,
    Film,
    PaginatedResponse,
    Screening,
    Venue,
} from "../types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.feffs.eu";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Films
  async getFilms(
    page = 1,
    pageSize = 20,
  ): Promise<ApiResponse<PaginatedResponse<Film>>> {
    return this.request(`/films?page=${page}&pageSize=${pageSize}`);
  }

  async getFilmById(id: string): Promise<ApiResponse<Film>> {
    return this.request(`/films/${id}`);
  }

  async searchFilms(query: string): Promise<ApiResponse<Film[]>> {
    return this.request(`/films/search?q=${encodeURIComponent(query)}`);
  }

  // Screenings
  async getScreenings(filters?: {
    filmId?: string;
    venueId?: string;
    date?: string;
  }): Promise<ApiResponse<Screening[]>> {
    const params = new URLSearchParams();
    if (filters?.filmId) params.append("filmId", filters.filmId);
    if (filters?.venueId) params.append("venueId", filters.venueId);
    if (filters?.date) params.append("date", filters.date);

    return this.request(`/screenings?${params.toString()}`);
  }

  async getScreeningById(id: string): Promise<ApiResponse<Screening>> {
    return this.request(`/screenings/${id}`);
  }

  // Events
  async getEvents(): Promise<ApiResponse<Event[]>> {
    return this.request("/events");
  }

  async getEventById(id: string): Promise<ApiResponse<Event>> {
    return this.request(`/events/${id}`);
  }

  // Venues
  async getVenues(): Promise<ApiResponse<Venue[]>> {
    return this.request("/venues");
  }

  async getVenueById(id: string): Promise<ApiResponse<Venue>> {
    return this.request(`/venues/${id}`);
  }

  // Daily Program
  async getDailyProgram(date: string): Promise<
    ApiResponse<{
      screenings: Screening[];
      events: Event[];
    }>
  > {
    return this.request(`/daily-program?date=${date}`);
  }

  // Pass Purchase
  async purchasePass(data: FormData): Promise<ApiResponse<{ passId: string }>> {
    return this.request("/pass/purchase", {
      method: "POST",
      body: data,
      headers: {
        // FormData will set its own Content-Type with boundary
      },
    });
  }

  // Surveys
  async submitSurvey(
    surveyId: string,
    answers: any,
  ): Promise<ApiResponse<void>> {
    return this.request(`/surveys/${surveyId}/submit`, {
      method: "POST",
      body: JSON.stringify(answers),
    });
  }
}

export const apiService = new ApiService();
