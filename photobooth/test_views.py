
def test_landing_page_view(admin_client):
    response = admin_client.get('/')
    assert response.status_code == 200


def test_remote_view(admin_client):
    response = admin_client.get('/remote/')
    assert response.status_code == 200
