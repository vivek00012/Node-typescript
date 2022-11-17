import {describe, expect} from '@jest/globals';
import * as request from "supertest";
import express from '../../../src/providers/Express';
import Account from '../../../src/models/account.schema';
import User from '../../../src/models/user.schema';

import db from '../../../src/providers/Database'

jest.setTimeout(20000)
describe('User Controller Tests', () => {
    beforeAll(async () => {
        await db.init()
      })

      beforeEach(async () => {
        await User.deleteMany();
        await new User({
         name: 'test1',
         emailAddress: 'test1@email.com',
         monthlySalary: 4000,
         monthlyExpense:1500
     }).save(); 
     })
      
      afterAll(async () => {
        await db.close()
      })

    it('should create a new Account for a user if monthly expense - salary is greater or equal to 1000$', async () => {
        const response = await request(express.app).post('/api/createAccount').send({
            email: 'test1@email.com',
        }).expect(201)    
        // Assertions about the response
        expect(response?.body.creditBalance).toBe(1000)
    })

    it('should not create a new Account for a user if monthly expense - salary is less than to 1000$', async () => {
        await new User({
            name: 'test1',
            emailAddress: 'test2@email.com',
            monthlySalary: 2000,
            monthlyExpense:1500
        }).save(); 

        await request(express.app).post('/api/createAccount').send({
            email: 'test2@email.com',
        }).expect(500) 
    })
})
