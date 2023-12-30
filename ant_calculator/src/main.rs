use std::f64;

struct Ant {
    position: (f64, f64),
    direction: (f64, f64),
}

impl Ant {
    fn new() -> Ant {
        Ant {
            position: (0.0, 0.0),
            direction: (1.0, 0.0),
        }
    }

    fn rotate(&mut self, angle: f64) {
        let rotated_angle = self.direction.1.atan2(self.direction.0) + angle;
        let length = (self.direction.0 * self.direction.0 + self.direction.1 * self.direction.1).sqrt();

        self.direction = (rotated_angle.cos(), rotated_angle.sin());
        self.direction = (self.direction.0 * length, self.direction.1 * length);
    }

    fn move_ant(&mut self, speed: f64) {
        self.position.0 += self.direction.0 * speed;
        self.position.1 += self.direction.1 * speed;
    }
}

fn main() {
    let mut ant = Ant::new();
    ant.rotate(0.5); // Rotate 0.5 radians
    ant.move_ant(2.0); // Move 2.0 units

    println!("Ant Position: {:?}", ant.position);
}