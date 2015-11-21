from rest_framework.reverse import reverse


def test_take_photo(mocker, admin_client):
    response = admin_client.post(reverse('take_photo'))
    assert response.status_code == 202


def test_take_photo_should_call_task(mocker, admin_client):
    mock_task = mocker.patch('photobooth.gallery.tasks.take_photo.delay')
    admin_client.post(reverse('take_photo'))
    assert mock_task.called
