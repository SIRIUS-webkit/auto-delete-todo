import type { NextApiRequest, NextApiResponse } from "next";

interface Hair {
  color: string;
}

interface Address {
  postalCode: string;
}

interface Company {
  department: string;
}

interface User {
  gender: string;
  age: number;
  hair: Hair;
  firstName: string;
  lastName: string;
  address: Address;
  company: Company;
}

interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: { [color: string]: number };
  addressUser: { [fullName: string]: string };
}

type GroupedData = {
  [department: string]: DepartmentSummary;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fetchRes = await fetch("https://dummyjson.com/users");
    const data = await fetchRes.json();

    if (!data.users) {
      throw new Error("Invalid data format");
    }

    const grouped: GroupedData = {};

    data.users.forEach((user: User) => {
      const department = user.company.department || "Unknown";
      if (!grouped[department]) {
        grouped[department] = {
          male: 0,
          female: 0,
          ageRange: "",
          hair: {},
          addressUser: {},
        };
      }

      // Update gender counts.
      if (user.gender.toLowerCase() === "male") {
        grouped[department].male += 1;
      } else if (user.gender.toLowerCase() === "female") {
        grouped[department].female += 1;
      }

      // Update age range.
      if (grouped[department].ageRange === "") {
        grouped[department].ageRange = `${user.age}-${user.age}`;
      } else {
        const [minStr, maxStr] = grouped[department].ageRange.split("-");
        let min = parseInt(minStr);
        let max = parseInt(maxStr);
        if (user.age < min) {
          min = user.age;
        }
        if (user.age > max) {
          max = user.age;
        }
        grouped[department].ageRange = `${min}-${max}`;
      }

      // Update hair color frequency.
      const hairColor = user.hair.color;
      grouped[department].hair[hairColor] =
        (grouped[department].hair[hairColor] || 0) + 1;

      // Map full name (concatenated firstName and lastName) to postal code.
      const fullName = `${user.firstName}${user.lastName}`;
      grouped[department].addressUser[fullName] = user.address.postalCode;
    });

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ error: `Error processing data ${error}` });
  }
}
