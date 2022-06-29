SELECT department_id FROM roles
INNER JOIN departments ON departments.id = roles.department_id;