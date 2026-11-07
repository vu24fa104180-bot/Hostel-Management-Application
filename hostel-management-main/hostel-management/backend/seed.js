import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Room from './models/Room.js';
import Bed from './models/Bed.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Room.deleteMany();
    await Bed.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash('admin123', salt);
    const hashedStudentPassword = await bcrypt.hash('student123', salt);

    const users = [
      {
        name: 'Admin User',
        regNo: 'ADMIN001',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
      },
      {
        name: 'John Doe',
        regNo: 'STUDENT001',
        email: 'student@example.com',
        password: hashedStudentPassword,
        role: 'student',
      },
    ];

    await User.insertMany(users);

    const rooms = [
      { roomNumber: 101, floorNumber: 1, sharing: 2 },
      { roomNumber: 102, floorNumber: 1, sharing: 3 },
      { roomNumber: 201, floorNumber: 2, sharing: 1 },
    ];

    const createdRooms = await Room.insertMany(rooms);

    const beds = [];
    createdRooms.forEach(room => {
      for (let i = 1; i <= room.sharing; i++) {
        beds.push({
          bedNumber: i,
          roomNumber: room.roomNumber,
          isAvailable: true,
        });
      }
    });

    await Bed.insertMany(beds);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
