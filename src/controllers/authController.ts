import User from "../model/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../loadEnv";

// Controller to register a user to DB
export async function register(req: any, res:any) {
    try {
        
        //console.log(req.body);
        const { username, email, password, roles } = req.body;
  
        // Validate user input
        if (!username || !email || !password || !roles) {
             res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Check if the email is already in use
        const existingUsername = await User.findOne({ email }).exec();
        
        if (existingUsername) {
            return res.status(409).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            roles,
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Controller to login a user
export async function login(req: any, res: any) {
    try {
        const { email, password } = req.body;
        
        // Validate user input
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        // Find the user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (isPasswordValid) {
          // Successfully signed in
          const token = jwt.sign({ id: user._id, email: user.email , roles: user.roles}, JWT_KEY as string);
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this case)
          });
  
          res.status(200).json({ message: 'Sign-in successful', user });
        } else {
          // Authentication failed
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}