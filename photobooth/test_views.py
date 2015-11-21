
def test_landing_page(admin_client):
    response = admin_client.get('/')
    assert response.status_code == 200
