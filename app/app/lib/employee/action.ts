export async function checkIn(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employee/checkin`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200) {
      return { message: "Gagal checkin", data: null };
    }

    const data = await response.json();
    return { message: "Sukses checkin", data: data.data };
  } catch (error) {
    console.error("error", error);
    return { message: "Gagal checkin", data: null };
  }
}

export async function checkOut({ id, token }: { id: number; token: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/employee/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      }
    );

    if (response.status !== 200) {
      return { message: "Gagal chout", data: null };
    }

    const data = await response.json();
    return { message: "Sukses chout", data: data.data };
  } catch (error) {
    console.error("error", error);
    return { message: "Gagal chout", data: null };
  }
}
