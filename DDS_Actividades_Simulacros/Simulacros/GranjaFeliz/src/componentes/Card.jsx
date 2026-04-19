import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../style/card.css";

function BasicExample({nombre, desc, foto}) {
  return (
    <Card className="card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={foto} className="card-img-top" />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{nombre}</Card.Title>
        <Card.Text className="card-text">
          {desc}
        </Card.Text>
        <Button variant="primary" className="btn-primary">Ver</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;