import { Attendance } from "../definitions";

export async function fetchAttendance(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/employee/attendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (response.status !== 200) return null;

    const data = await response.json();
    return data.data as Attendance;
  } catch (error) {
    console.error("error", error);
  }

  return null;
}

export async function fetchAttendances(token: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/employee/attendances`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (response.status !== 200) return [];

    const data = await response.json();
    return data.data as Attendance[];
  } catch (error) {
    console.error("error", error);
  }

  return [];
}
